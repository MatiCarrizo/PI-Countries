import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001';

export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_COUNTRY_DETAIL = 'GET_COUNTRY_DETAIL';
export const CREATE_ACTIVITY = 'CREATE_ACTIVITY';
export const SEARCH_COUNTRY = 'SEARCH_COUNTRY';
export const FILTER_BY_CONTINENT = 'FILTER_BY_CONTINENT';
export const FILTER_BY_ACTIVITY = 'FILTER_BY_ACTIVITY';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_POPULATION = 'ORDER_BY_POPULATION';


export const getCountries = () => {
    return async (dispatch) => {
        let info = await axios.get('/countries');
        return dispatch({ type: GET_COUNTRIES, payload: info.data });
    }
}

export const getCountryDetail = (id) => {
    return async (dispatch) => {
        let info = await axios.get(`/countries/${id}`);
        return dispatch({ type: GET_COUNTRY_DETAIL, payload: info.data });
    }
}

export const createActivity = (payload) => {
    return async () => {
        let info = await axios.post('/activities', payload);
        return info;
    }
}


export const searchCountry = (payload) => {
    return async (dispatch) => {
        let info = await axios.get(`/countries?name=${payload}`);
        return dispatch({ type: 'SEARCH_COUNTRY', payload: info.data })
        // try {
        // } catch (error) {
        //     console.log('Error al buscar pais', error);
        // }
    }
}

//----------------------Ordenados----------------------

export const ordeByName = (payload) => {
    return {
        type:'ORDER_BY_NAME',
        payload
    }
}

export const orderByPopulation = (payload) => {
    return {
        type: 'ORDER_BY_POPULATION',
        payload
    }
}

//----------------------Filtrados----------------------

export const filterByContinent = (payload) => {
    return {
        type:'FILTER_BY_CONTINENT',
        payload
    }
}

export const filterByActivity = (payload) => {
    return {
        type: 'FILTER_BY_ACTIVITY',
        payload
    }
}
