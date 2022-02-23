import React, {useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useDispatch,useSelector} from "react-redux";
import {getDetail} from "../actions";
export default function Detail () {
  const dispatch = useDispatch();
  const paramas = useParams();
  const navigate= useNavigate();
  const detail = useSelector(state=>state.detail)

   
  useEffect(()=>{
    let countryId = paramas.id;
    dispatch(getDetail(countryId))
  }, [dispatch,paramas.id])
 
  const navegacion =() =>{
    navigate("/home");
  }
 
  return (
    <div>
      {
        detail? (
        detail.map((e,i)=>(
          <div key={i}> 
           <h1>Title:{e.name}</h1>
           <h2>Code the country:{e.id}</h2>
           <h3>Capital:{e.capital}</h3>
           <h3>Subregion:{e.subregion}</h3>
           <h3>Area:{e.area}Km2</h3>
           <h3>Population:{e.population}</h3>
           <img src={e.img} alt="img not found" />
           <h1>LISTA DE ACTIVIDADES</h1>
           {
             e.activities.length? 
             e.activities.map((c,i)=>(
               <div key={i}> 
                 
                 <h2>Name of the activity:{c.name}</h2>
                 <h2>Duration of activity:{c.duration} hour/s</h2>
                 <h2>Difficulty of the activity:{c.difficulty}</h2>
                 <h2>Season:{c.season}</h2>
               </div>
             )) : 
             <h2>No hay actividades creadas para este pais</h2>
           }
           <button onClick={navegacion}>Back</button>
          </div>
        ))
  ) : (
           <p>Loading...</p>
  )
      }
    </div>
  )

    }