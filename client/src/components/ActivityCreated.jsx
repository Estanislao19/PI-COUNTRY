import React,{useState,useEffect} from "react";
import {Link, Navigate} from 'react-router-dom';
import {postActivity,getCountries} from '../actions/index';
import {useDispatch,useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';



export default function ActivityCreated (){
const dispatch = useDispatch ();
const countries = useSelector ((state) =>state.countries);
const [errors,setErrors]=useState({})
const [input,setInput] =useState({
    name:"",
    difficulty:"",
    duration:"",
    season:"",
    countries:[], // quiero que se carge mas de una
})


function handleChange(e){
    setInput({
        ...input,
        [e.target.name] : e.target.value // tiene que agrrar el estado y modificarlo
    })
    
}
function handleCheck(e) {
    // aca se guarda el nombre del input y el valor que se esta modificando en ese input
    if (e.target.checked) {
      // si el checkbox esta checkeado se agrega el nombre del pais al input de countries
      setInput({
        //
        ...input, // copiamos el input actual para que no se borre el anterior valor del input countries
        [e.target.name]: e.target.value, // aca se guarda el nombre del input y el valor que se esta modificando en ese input
      });
    }
  }
function handleSelect(e){
    setInput({
        ...input,
        countries:[...input.countries,e.target.value] //traeme lo que ya teneias y concatenale el targetvalue /voy  necesitar pasarle muchos
    })
}
function handleSubmit(e) {
    if (
      !input.name ||
      !input.difficulty ||
      !input.duration ||
      !input.season ||
      !input.countries
    ) {
      e.preventDefault();
      alert("Complete todos los campos para poder continuar");
    } else {
      e.preventDefault();
      dispatch(postActivity(input));
      alert("Tu actividad ha sido creada exitosamente");
      // Para volver a la pantalla principal
    
      // Reseteamos el input
      setInput({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries: [],
      });
    }
  }
  function handleDelete(e) {
    setInput({
      ...input,
      //Se va a filtrar todo el array, devolviendo todos los paises que no coincidan con el seleccionado
      countries: input.countries.filter((country) => country !== e), // e es el pais que se esta eliminando de countries (el pais que se esta checkeando)
    });
}

useEffect(()=>{
    dispatch(getCountries("asc"))
},[dispatch])
console.log('e',input)

return (
    <div >
      <div >
        <Link to='/home'>
          <button >Volver</button>
        </Link>
      </div>
      <h1 >CREAR ACTIVIDAD</h1>
      <form onSubmit={(e) => handleSubmit(e)} >
        <div>
          <div >
            <label >Nombre: </label>
            <input
              type='text'
              value={input.name}
              name='name'
              pattern='[a-zA-Z\u00C0-\u017F ]{2,254}'
              onChange={handleChange}
              
            />
            {errors.name && <p>{errors.name}</p>}
          </div>
          <div >
            <label >Dificultad: </label>
            <label>
              <input
                type='radio'
                value='1'
                name='difficulty'
                onChange={(e) => handleCheck(e)}
              />
              1
            </label>
            <label>
              <input
                type='radio'
                value='2'
                name='difficulty'
                onChange={(e) => handleCheck(e)}
              />
              2
            </label>
            <label>
              <input
                type='radio'
                value='3'
                name='difficulty'
                onChange={(e) => handleCheck(e)}
              />
              3
            </label>
            <label>
              <input
                type='radio'
                value='4'
                name='difficulty'
                onChange={(e) => handleCheck(e)}
              />
              4
            </label>
            <label>
              <input
                type='radio'
                value='5'
                name='difficulty'
                onChange={(e) => handleCheck(e)}
              />
              5
            </label>
          </div>
          <div >
            <label >Duracion: </label>
            <input
              type='text'
              value={input.duration}
              name='duration'
              onChange={handleChange}
              
            />
            {errors.duration && <p>{errors.duration}</p>}
          </div>
          <div >
            <label >Temporada: </label>
            <label>
              <input
                type='radio'
                value='Verano'
                name='season'
                onChange={(e) => handleCheck(e)}
              />
              Verano
            </label>
            <label>
              <input
                type='radio'
                value='Primavera'
                name='season'
                onChange={(e) => handleCheck(e)}
              />
              Primavera
            </label>
            <label>
              <input
                type='radio'
                value='Otoño'
                name='season'
                onChange={(e) => handleCheck(e)}
              />
              Otoño
            </label>
            <label>
              <input
                type='radio'
                value='Invierno'
                name='season'
                onChange={(e) => handleCheck(e)}
              />
              Invierno
            </label>
            {errors.season && <p>{errors.season}</p>}
          </div>
          <div >
            <label >Pais donde se realiza: </label>
            <div >
              <select
                onChange={(e) => handleSelect(e)}
                
              >
                {countries.map((country) => (
                  <option value={country.name}>{country.name}</option>
                ))}
              </select>
            </div>
            {errors.countries && <p>{errors.countries}</p>}
          </div>
          {input.countries.map((e) => (
            <div >
              <p >{e}</p>
              <button
                type='button'
                onClick={() => handleDelete(e)}
                 >
                X
              </button>
            </div>
          ))}
          <div >
            <button type='submit' >
              Crear actividad
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}