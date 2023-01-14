import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CountryCards from '../CountryCards/CountryCards';
import SearchBar from '../SearchBar/SearchBar';
import Paginado from '../Paginado/Paginado';
import HomeStyles from './Home.module.css';
import { getCountries, getCountryDetail, createActivity, searchCountry, ordeByName, orderByPopulation, filterByContinent, filterByActivity } from '../../redux/actions';

import linkedin from '../../img/linkedin.png';
import github from '../../img/github.png';


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
            <h1 className={HomeStyles.title}>Countries PI</h1>
            {/* ---------Barra superior--------- */}
            <div className={HomeStyles.searchBar}>
                <div>
                    <SearchBar/>
                </div>
            </div>

                <div className={HomeStyles.bigConteiner}>
                    <div className={HomeStyles.conteiner}>
                        <Link to= '/'>
                            <button className={HomeStyles.button} id= 'back'>Landing</button>
                        </Link>
                        <Link to= '/createActivity'>
                            <button className={HomeStyles.button} id= 'create'>Create Activity</button>
                        </Link>
                        <button className={HomeStyles.button} onClick={(e) => handleClick(e)} id= 'reload'>Reload</button>
                    </div>
                    <div className={HomeStyles.filters}>
                        <h3>Filters</h3>
                        {/* ---------Ordenamiento por nombre--------- */}
                        <div className={HomeStyles.orderN}>
                            <select onChange={(e) => handleOrderByName(e)}>
                                <option value='ascName'>A - Z</option>
                                <option value='descName'>Z - A</option>
                            </select>
                        </div>

                        {/* ---------Ordenamiento por Poblacion--------- */}
                        <div className={HomeStyles.orderN}>
                            <select onChange={(e) => handleOrderByPopulation(e)}>
                                <option value='ascPopulation'>Population Low-High</option>
                                <option value='descPopulation'>Population High-Low</option>
                            </select>
                        </div>

                        {/* ---------Filtrado por Continente--------- */}
                        <div className={HomeStyles.orderN}>
                            <select onChange={(e) => handleFilterContinent(e)}>
                                <option value='All'>All Continents</option>
                                <option value='Africa'>Africa</option>
                                <option value='Antarctica'>Anctartica</option>
                                <option value='Asia'>Asia</option>
                                <option value='Europe'>Europe</option>
                                <option value='North America'>North America</option>
                                <option value='Oceania'>Oceania</option>
                                <option value='South America'>South America</option>
                            </select>
                        </div>

                        {/* ---------Filtrado por Actividades--------- */}
                        <div className={HomeStyles.orderN}>
                            <select>
                                <option value='sky'>Sky</option>
                                <option value='kayak'>Kayak</option>
                                <option value='mountaineering'>Mountaineering</option>
                                <option value='trekking'>Trekking</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* ---------Country Cards--------- */}
                <div className={HomeStyles.cards}>
                    {currentCountries.map((el) => (
                        <CountryCards
                            id = {el.id}
                            name = {el.name}
                            flag_image = {el.flag_image}
                            continent = {el.continent}
                            population = {el.population}
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

            {/* ---------Linkedin y Github--------- */}
            <div className={HomeStyles.links}>
                <a
                    href="https://www.linkedin.com/in/matias-carrizo-a9751b121/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img src={linkedin} alt="linkedin" className={HomeStyles.linkedin} />
                </a>

                <a
                    href="https://github.com/MatiCarrizo"
                    target="_blank"
                    rel="noreferrer"
                >
                    {" "}
                    <img src={github} alt="github" className={HomeStyles.github} />
                </a>
            </div>
        </div>
    )
}

export default Home;











