import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CountryCards from '../CountryCards/CountryCards';
import SearchBar from '../SearchBar/SearchBar';
import Paginado from '../Paginado/Paginado';
import HomeStyles from './Home.module.css';
import { getCountries, getCountryDetail, createActivity, searchCountry, ordeByName, orderByPopulation, filterByContinent, filterByActivity } from '../../redux/actions';



const Home = () => {
    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.countries);

    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage, setCountriesPerPage] = useState(10);
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry);

    const [order, setOrder] = useState("");

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch]);

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getCountries());
    }

    const handleFilterContinent = (e) => {
        dispatch(filterByContinent(e.target.value));
    }

    const handleOrderByName = (e) => {
        e.preventDefault();
        dispatch(ordeByName(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`)
    }

    const handleOrderByPopulation = (e) => {
        e.preventDefault();
        dispatch(orderByPopulation(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`)
    }

    return (
        <div>
            {/* ---------Barra superior--------- */}
            <div className={HomeStyles.conteiner}>
                <div>
                    <Link to= '/'>
                        <button className={HomeStyles.button} id= 'back'>Landing</button>
                    </Link>
                    <Link to= '/createActivity'>
                        <button className={HomeStyles.button} id= 'create'>Create Activity</button>
                    </Link>
                    <button className={HomeStyles.button} onClick={(e) => handleClick(e)} id= 'reload'>Reload</button>
                </div>
                <div>
                    <SearchBar/>
                </div>
            </div>
            
            <div div className={HomeStyles.filters}>
                {/* ---------Ordenamiento por nombre--------- */}
                <select onChange={(e) => handleOrderByName(e)}>
                    <option value='ascName'>Nombre Ascendente</option>
                    <option value='descName'>Nombre Descendente</option>
                </select>

                {/* ---------Ordenamiento por Poblacion--------- */}
                <select onChange={(e) => handleOrderByPopulation(e)}>
                    <option value='ascPopulation'>Poblacion Ascendente</option>
                    <option value='descPopulation'>Poblacion Descendente</option>
                </select>

                {/* ---------Filtrado por Continente--------- */}
                <select onChange={(e) => handleFilterContinent(e)}>
                    <option value='All'>All</option>
                    <option value='Africa'>Africa</option>
                    <option value='Antarctica'>Anctartica</option>
                    <option value='Asia'>Asia</option>
                    <option value='Europe'>Europe</option>
                    <option value='North America'>North America</option>
                    <option value='Oceania'>Oceania</option>
                    <option value='South America'>South America</option>
                </select>

                {/* ---------Filtrado por Actividades--------- */}
                <select>
                    <option value='sky'>Sky</option>
                    <option value='kayak'>Kayak</option>
                    <option value='mountaineering'>Mountaineering</option>
                    <option value='trekking'>Trekking</option>
                </select>
            </div>

            {/* ---------Country Cards--------- */}
            <div className={HomeStyles.cards}>
                {currentCountries.map((el) => (
                    <CountryCards
                        id = {el.id}
                        name = {el.name}
                        flag_image = {el.flag_image}
                        continent = {el.continent}
                    />
                ))}
            </div>

            {/* ---------Paginado--------- */}
            <div className={HomeStyles.paginado}>
                <Paginado
                countriesPerPage={countriesPerPage}
                allCountries={allCountries.length}
                paginado={paginado}
                />
            </div>
        </div>
    )
}

export default Home;











