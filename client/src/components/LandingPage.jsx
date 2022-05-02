import React from 'react';
import {Link} from 'react-router-dom';
import style from'./LandingPage.module.css';

export default function LandingPage () {
    return (
        <div className={style.page}>
            <div className={style.h1}>
            <h1>Bienvenidos a mi pagina de paises</h1>
            <Link to='/home'><button className={style.btn}>Ingresar</button></Link>
            </div>
        </div>
    )
}