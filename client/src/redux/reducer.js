import {
    GET_ACTIVITIES,
    DELETE_ACTIVITIES,
    GET_COUNTRIES,
    GET_COUNTRY_DETAIL,
    CREATE_ACTIVITY,
    SEARCH_COUNTRY,
    FILTER_BY_CONTINENT,
    FILTER_BY_ACTIVITY,
    ORDER_BY_NAME,
    ORDER_BY_POPULATION,
} from './actions';

const initialState = {
    countries: [],
    allCountries: [],
    countryDetail: {},
    activities: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        // -------------------------------------------------------------------------------
        case GET_ACTIVITIES:
            return { ...state, activities: action.payload };

        // -------------------------------------------------------------------------------
        case GET_COUNTRIES:
            return { ...state, countries: action.payload, allCountries: action.payload };

        // ------------------------------------------------------------------------------
        
        case GET_COUNTRY_DETAIL:
            return { ...state, countryDetail: action.payload };
            
        // -------------------------------------------------------------------------------
    
        case SEARCH_COUNTRY:
            return {
                ...state,
                countries: action.payload
            }

        // -------------------------------------------------------------------------------

        case CREATE_ACTIVITY:
            return {
                ...state,
            }
        
        // -------------------------------------------------------------------------------

        case DELETE_ACTIVITIES:
            return {
                ...state,
            }

        // -------------------------------------------------------------------------------

        case ORDER_BY_NAME:
            let orderName = action.payload === 'ascName' ? state.countries.sort((a, b) => {
                if (a.name.localeCompare(b.name) > 0) return 1;
                if (a.name.localeCompare(b.name) < 0) return -1;
                return 0;
            }) : state.countries.sort((a, b) => {
                if (a.name.localeCompare(b.name) < 0) return 1;
                if (a.name.localeCompare(b.name) > 0) return -1;
                return 0;
            })
            return {
                ...state,
                countries: orderName
            }

        // -------------------------------------------------------------------------------

        case ORDER_BY_POPULATION:
            let orderPopulation = action.payload === 'ascPopulation' ? state.countries.sort((a, b) => {
                if (parseInt(a.population, 10) > parseInt(b.population, 10)) return 1;
                if (parseInt(a.population, 10) < parseInt(b.population, 10)) return -1;
                return 0;
            }) : state.countries.sort((a, b) => {
                if (parseInt(a.population, 10) < parseInt(b.population, 10)) return 1;
                if (parseInt(a.population, 10) > parseInt(b.population, 10)) return -1;
                return 0;
            })
            return {
                ...state,
                countries: orderPopulation
            }
        
        // ----------------------------------------------------------------------------------

        case FILTER_BY_CONTINENT:
            const allCountries = state.allCountries;
            const continentFiltered = action.payload === 'All' ? allCountries : allCountries.filter(el => el.continent === action.payload)
            return {
                ...state,
                countries: continentFiltered
            }
        
        // ----------------------------------------------------------------------------------

        case FILTER_BY_ACTIVITY:
            const acts = state.activities;
            const activityFiltered = acts.length && action.payload === 'allActivities' ? state.allCountries : state.allCountries.filter(el => el.activities.find(e => e === action.payload))
            return {
                ...state,
                countries: activityFiltered
            }

            
        // ----------------------------------------------------------------------------------

        default:
            return state;
    }
}

export default rootReducer;