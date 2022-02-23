import React from 'react';
import { useState } from 'react';
import {useDispatch} from 'react-redux';
import {getSearch} from "../actions";


export default function SearchBar () {
    const dispacth = useDispatch();
    const [name,setName] = useState('')

    function handleInputChange(e){
     e.preventDefault();
     setName(e.target.value); // agarro el value del input
     console.log(name)
    }
    function handleSubmit(e){
        e.preventDefault();
        dispacth(getSearch(name)) // el name va a ser mi estado local voy a guadar lo que voy a hacer en name
        setName({
         name:""
        })
    }

    return (
        <div>
            <input type='text' 
            placeholder='Buscar countries...' 
            value={name.name}
            onChange={(e)=> handleInputChange(e)}
            />
            <button type='submit' onClick={(e)=>handleSubmit(e)} >Buscar...</button>
        </div>
    )
}