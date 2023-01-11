import React from "react";
import { Link } from "react-router-dom";
import CardStyles from './CountryCards.module.css'


const CountryCards = ({id, name, flag_image, continent}) => {
    //const {id, name, flag_image, continent} = props;
    return (
        <div className={CardStyles.divCard}>
            <div className={CardStyles.divTitles}>
                <h2>{name}</h2>
                <h3>Continent: {continent}</h3>
            </div>
            <div>
                <Link to={`/home/${id}`}>
                    <img className={CardStyles.imgCard} src={flag_image} alt="Country" />
                </Link>
            </div>
        </div>
    )
}


export default CountryCards;