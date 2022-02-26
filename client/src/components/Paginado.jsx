

import React from 'react';
import Style from "./Paginado.module.css"


export default function Paginado({ countriesPerPage, allCountries, paginado }) {
    
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(allCountries/countriesPerPage); i++) {
        pageNumbers.push(i)

    }

    return ( //ésto renderiza los numeritos del paginado
        <nav className={Style.nav}>
            <ul className={Style.pagina}>
                {pageNumbers &&
                    pageNumbers.map(number => (
                   
                            <button className={Style.num} onClick={() => paginado(number)}>{number}</button>
                        
                    ))}
            </ul>
        </nav>
    )
}

