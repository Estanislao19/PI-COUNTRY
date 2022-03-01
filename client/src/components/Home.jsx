import React from 'react';
import { useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCountries,filterCountriesByContinents, filterPopulation,filterAlfa} from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card'; 
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import FiltActivity from './FiltActivity';
import Style from './Home.module.css';

export default function Home(){
	const dispatch = useDispatch (); // hook
	const allCountries = useSelector ((state) =>state.countries);
	const [order, setOrder] = useState('')
	const [orderaz,setOrderAZ] =useState('')
	const [currentPage, setCurrentPage] = useState(1)//1ro mi pagina actual y un estado q setee mi pag actual
    // const [countriesPerPage, setCountriesPerPage] = useState(10)//setea cant personajes x pag
    var countriesPerPage = 0;
    if (currentPage === 1) { countriesPerPage = 9 }
   if (currentPage >= 2) { countriesPerPage = 10 }
    const lastCountry = currentPage * countriesPerPage//10
    const firstCountry = lastCountry - countriesPerPage //0
    const currentCountries = allCountries.slice(firstCountry, lastCountry)//ésta constante tiene los personajes que estan en la pagina actual

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

   function handleClick(e){
		e.preventDefault();
		dispatch(getCountries());

   }

	useEffect(()=>{
		dispatch(getCountries())
		
	},[dispatch])

	
	
	function handleFilterStatus(e){
     dispatch(filterCountriesByContinents(e.target.value)) // para aceder a la functiones(e.target.value)
	}
	
     function handlefilterPopulation(e){
		 e.preventDefault();
		 dispatch(filterPopulation(e.target.value));
		 setCurrentPage(1); 
		 setOrder(`Ordenado ${e.target.value}`)//modifique el estado local y se renderice
	 }
	 function handlefilterAlfa(e){
     e.preventDefault();
	 dispatch(filterAlfa(e.target.value));
	 setOrderAZ(`Ordenado ${e.target.value}`)
	 }
     
	 
	 return(
		
			<div className={Style.ho} >
<div className={Style.hotn} >
		<Link to = '/activity'><button >Crear Actividades</button></Link>
		<h1 className={Style.hom}>PAGINA DE PAISES</h1>
		</div>
		<div >
		<select className={Style.hon} onChange = {e=>handleFilterStatus(e)} >
		<option value="All">Todos</option>
		<option value="Europe">Europa</option>
		<option value="Africa">Africa</option>
		<option value="Oceania">Oceania</option>
		<option value="Antarctica">Antarctica</option>
		<option value="North America">North America</option>
		<option value="South America">South America</option>
		</select>
		<select className={Style.honn} onChange ={e => handlefilterPopulation(e)}>
			<option value ='asendente'>Mayor Poblacion</option>
			<option value ='desendente'>Menor Poblacion</option>
		</select>
		<select className={Style.honny} onChange ={e => handlefilterAlfa(e)}>
		<option value ='asc'>A-Z</option>
		<option value ='des'>Z-A</option>
		</select>
		
		<button className={Style.btn}  onClick={e=> {handleClick(e)}}>Volver a cargar paises</button>
		</div>
		<br/>
		<div>
		<SearchBar/>
		
		<Paginado
                countriesPerPage={countriesPerPage}
                allCountries={allCountries.length}
                paginado={paginado}
            /></div> 
	
	<FiltActivity />

	{
                    currentCountries.map(el => {
                        return (
                            <div key={el.id}>
                                <Link to={"/home/" + el.id} >
		<Card name={el.name}  continents={el.continents} img={el.img} population={el.population}  />
		</Link>
		</div>
		)})}
		</div>
	 )}
	 