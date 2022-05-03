import React, {useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useDispatch,useSelector} from "react-redux";
import {getDetail} from "../actions";
import Style from "./Detail.module.css";
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
    <div className={Style.det}>
      {
        detail? (
        detail.map((e,i)=>(
          <div className={Style.tit} key={i}> 
           <h1 className={Style.actividades}>Title:{e.name}</h1>
           <h2 className={Style.tat}>Code the country:{e.id}</h2>
           <h3 className={Style.tat}>Capital:{e.capital}</h3>
           <h3 className={Style.tat}>Area:{e.area}Km2</h3>
           <h3 className={Style.tat}>Population:{e.population}</h3>
           <img className={styleMedia.img} src={e.img} alt="img not found" />
           <h1 className={Style.actividades}>LISTA DE ACTIVIDADES</h1>
           {
             e.activities.length? 
             e.activities.map((c,i)=>(
               <div className={Style.activid} key={i}> 
                 
                 <h2 className={Style.tat}> Name of the activity:{c.name}</h2>
                 <h2 className={Style.tat}>Duration of activity:{c.duration} hour/s</h2>
                 <h2 className={Style.tat}>Season:{c.season}</h2>
                 
               </div>
             )) : 
             <h2>No hay actividades creadas para este pais</h2>
           }
           <button className={Style.btnn} onClick={navegacion}>Back</button>
          </div>
        ))
  ) : (
           <p>Loading...</p>
  )
      }
    </div>
  )

    }