import React from'react';

export default function Paginado ({countriesPerPage,allCountries,paginado}){

const pageNumber =[]

for(let i=1; i<=Math.ceil(allCountries/countriesPerPage); i++){ //28
    pageNumber.push(i)
}
//el  numero es cada una de las paginas que yo necisito para renderizar todos mis persoanjes

return(
    <nav>
        <ul>
            {pageNumber && pageNumber.map(number=>{
                return(
                      
                    <button  onClick={()=>paginado(number)}>{number}</button>
              
                   
                )
            })}
        </ul>
    </nav>
)

}