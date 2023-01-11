const { Router } = require('express');
const { getApiInfo, addCountriesToDb, getDbInfo, createActivity } = require('../functions/index.js');
const { Country, Activity } = require('../db');

const router = Router();


// GET /countries:
// En una primera instancia deberán traer todos los países desde restcountries y guardarlos en su propia base de datos y luego ya utilizarlos desde allí (Debe retonar sólo los datos necesarios para la ruta principal)
// Obtener un listado de los paises.

// GET /countries?name="...":
// Obtener los países que coincidan con el nombre pasado como query parameter (No necesariamente tiene que ser una matcheo exacto)
// Si no existe ningún país mostrar un mensaje adecuado

router.get('/', async (req, res) => {
    const {name} = req.query;
    addCountriesToDb();
    const dbData = await Country.findAll();
    let countryList = [];
    
    try {
        if(!name) {
            console.log('Entro al if');
            await dbData.map(e => countryList.push({id:e.id, name: e.name, continent: e.continent, flag_image: e.flag_image, population: e.population}));
            return res.status(200).json(countryList);
        }
        else {
            // const filteredCountry = await Country.findAll({
            //     where: {
            //         name: {
            //             [Op.iLike]: '%' + name + '%'
            //         }
            //     }
            // });
            const filteredCountry = dbData.filter(ele => ele.name.toLowerCase().includes(name.toLowerCase()));
            return filteredCountry.length? res.status(200).json(filteredCountry): res.status(400).send('Country not found');
        }
    } catch (error) {
        return res.status(400).send(error);
    }
});

// GET /countries/{idPais}:
// Obtener el detalle de un país en particular
// Debe traer solo los datos pedidos en la ruta de detalle de país
// Incluir los datos de las actividades turísticas correspondientes

router.get('/:idPais', async (req, res) => {
    const {idPais} = req.params;
    const allCountry = await getDbInfo();

    try {
        if(idPais) {
            const idFind = await allCountry.filter(e => e.id === idPais);
            return idFind.length? res.status(200).json(idFind): res.status(400).send('ID of country not found');
        }
    } catch (error) {
        return res.status(400).send(error);
    }
});

module.exports = router;


