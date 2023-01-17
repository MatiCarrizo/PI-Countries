import React from "react";
import PagStyles from './Paginado.module.css'


const Paginado = ({countriesPerPage, allCountries, paginado, countriesPageOne}) => {
    const pageNumbers = []

    for (let i = 2; i <=  Math.ceil(countriesPageOne/countriesPageOne + ((allCountries - countriesPageOne) / countriesPerPage)); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <div className={PagStyles.list}>
                <button className={PagStyles.number} onClick={() => paginado(1)}>{1}</button>
                {pageNumbers?.map(number => (
                    <button className={PagStyles.number} onClick={() => paginado(number)}>{number}</button>
                ))}
            </div>
        </div>
    )
}

export default Paginado;