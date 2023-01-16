const axios = require('axios');
const { Country, Activity } = require('../db.js');

//---------------------------------- Obtener información de la API ----------------------------------
const getApiInfo = async () => {
    try {
        const apiUrl = await axios.get('https://restcountries.com/v3/all');
        const apiInfo = await apiUrl.data.map(e => {
            return {
                id: e.cca3,
                name: e.name.common,
                flag_image: e.flags[0],
                continent: e.continents[0],
                capital: e.capital? e.capital[0]: 'undefined',
                subregion: e.subregion,
                area: e.area,
                population: e.population,
            }
        });
        return apiInfo; 
    } catch (error) {
        console.log('Error al obtener información de la api', error);
    }
};

//---------------------------------- Cargar en DB la información de la API ----------------------------------
const addCountriesToDb = async () => {
    try {
        const dbData = await Country.findAll();

        if(dbData.length < 1) {
            const allCountries = await getApiInfo();
            await Country.bulkCreate(allCountries);
        }
    } catch (error) {
        console.log('Error al cargar en la DB la información de la api', error);
    }
};

//---------------------------------- Obtener informacion de la DB incluyendo las actividades ----------------------------------
const getDbInfo = async () => {
    try {
        return await Country.findAll({
            include: {
                model: Activity,
                attributes: ['name', 'difficulty', 'duration', 'season'],
                through: {
                    attributes: [],
                },
            }
        }) 
    } catch (error) {
        console.log('Error al cargar de la DB la información incluyendo Actividades', error);
    }
};

//---------------------------------- Creación de las actividades ----------------------------------
const createActivity = async (name, difficulty, duration, season, countryId) => {
    try {
        let [act, created] = await Activity.findOrCreate({
            where: {
                name, 
                difficulty, 
                duration, 
                season,
            }
        })
        console.log(created);
        await act.setCountries(countryId);
        return act;
    } catch (error) {
        console.log('Error al crear la actividad', error);
    }
};

module.exports = { getApiInfo, addCountriesToDb, getDbInfo, createActivity };