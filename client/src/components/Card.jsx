import React from "react";


export default function Card ({name, continents, img, population}){
    return (
        <div className = 'Card'>
            <h3>{name}</h3>
            <img src={img} alt='Imagen no encontrada' width='250px' height='175px'/>
            <h3>{continents}</h3>
            <h3>{population}</h3>
        </div>
    )
}