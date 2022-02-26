import React from "react";
import Style from './Card.module.css';

export default function Card ({name, continents, img, population}){
    return (
        <div className = {Style.Card}>
            <h3 className = {Style.text}>{name}</h3>
            <img className = {Style.text}src={img} alt='Imagen no encontrada' width='250px' height='175px' className={Style.cardd}/>
            <h3>{continents}</h3>
            <h3>{population}</h3>
        </div>
    )
}