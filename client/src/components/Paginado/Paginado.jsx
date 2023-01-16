import React from "react";
import PagStyles from './Paginado.module.css'

const Paginado = ({countriesPerPage, allCountries, paginado}) => {
    const pageNumbers = []

    for (let i = 1; i <=  Math.ceil(allCountries / countriesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <div className={PagStyles.list}>
                {pageNumbers?.map(number => (
                    <button className={PagStyles.number} onClick={() => paginado(number)}>{number}</button>
                ))}
            </div>
        </div>
    )
}

export default Paginado;