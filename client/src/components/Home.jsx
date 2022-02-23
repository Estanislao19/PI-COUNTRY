import React from 'react';
import { useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCountries,filterCountriesByContinents, filterPopulation,filterAlfa, getActivity, filterByActivity} from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card'; 
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import ActivityFilter from './ActivityFilter';
import Style from './Home.module.css';

export default function Home(){
	const dispatch = useDispatch (); // hook
	const allCountries = useSelector ((state) =>state.countries);
	const [filterState, setFilterState] = useState({
		continent: [],
		sort: "Orden",
		activity: "All",
		countrySearch: "",
	  });
    const [currentPage,setCurrentPage] =useState(1); 
	const [countriesPerPage] =useState(9);
	const indexOfLastCountry= currentPage * countriesPerPage// 9
	const indexOfFirstCountry= indexOfLastCountry - countriesPerPage; // 0
	const currentCountry = allCountries.slice(indexOfLastCountry, indexOfFirstCountry) //va a setar la pagina en el indice que yo toque
	const [order, setOrder] = useState('')
	const [orderaz,setOrderAZ] =useState('')
	const allActivities = useSelector((state)=> state.activities)
     
	
	const paginado = (pageNumber) => {//va a setar la pagina en el indice que yo toque
		setCurrentPage(pageNumber)
	}
     
   function handleClick(e){
		e.preventDefault();
		dispatch(getCountries());

   }

	useEffect(()=>{
		dispatch(getCountries())
		dispatch(getActivity())
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
     function handleFilterActivity(e){
		 dispatch(filterByActivity(e.target.value))
		 console.log('e',e.target.value)
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
		{currentCountry &&
		<Paginado 
		countriesPerPage={countriesPerPage}
		allCountries={allCountries.length}
		paginado={paginado}>
		</Paginado>}</div> 
		<ActivityFilter
            setCurrentPage={setCurrentPage}
            setFilterState={setFilterState}
            filterState={filterState}
          />
		{allCountries.map(el=>{
		return(
		<div key={el.id} >
		<Link to= {'/home/' + el.id}>
		<Card name={el.name} continents={el.continents} img={el.img} population={el.population}  />
		</Link>
		</div>
		)})}
		</div>
	)}