import React from "react";
import { Link } from "react-router-dom";
import CardStyles from './CountryCards.module.css'


const CountryCards = ({id, name, flag_image, continent, population}) => {
    return (
        <div className={CardStyles.divCard}>
            <div className={CardStyles.divTop}>
                <div className={CardStyles.divImg}>
                    <Link to={`/home/${id}`}>
                        <img className={CardStyles.imgCard} src={flag_image} alt="Country" />
                    </Link>
                </div>
                <div className={CardStyles.divTitles}>
                    <h3>{name}</h3>
                </div>
            </div>
            <div className={CardStyles.contents}>
                <h4>Continent: {continent}</h4>
                <h4>Population: {population}</h4>
            </div>
        </div>
    )
}


export default CountryCards;