import axios from 'axios';



export function getCountries(){
return async function (dispatch) {
    var json = await axios.get('http://localhost:3001/countries')
    return dispatch({
    type:'GET_COUNTRIES',
    payload:json.data,
    })
}
}
export function getActivity(){
    return async function (dispatch){
        var json=await axios.get('http://localhost:3001/activity')
        console.log('jsonn',json.data)
        return dispatch({
            type: 'GET_ACTIVITY ',
            payload:json.data
        })
    }
}
export function postActivity(payload) {
    return async function (dispatch) {
        var response = await axios.post("http://localhost:3001/activity", payload);
        console.log(response);
        return dispatch({
          type:'POST_ACTIVITY',
          payload:response
        })
    }
}

export function getSearch(name){
    return async function (dispatch){
        try{
            var json=await axios.get("http://localhost:3001/countries?name=" + name);
            return dispatch({
                type:'GET_SEARCH',
                payload:json.data
            })
        }catch(e){
            console.log(e)
        }
    }
}

export function filterCountriesByContinents(payload){
    console.log(payload)
    return {
        type:'FITER_BY_CONTINENTS',
        payload,
    }
    
}

export function filterPopulation(payload){
    return {
        type: 'FILTER_BY_POPULATION',
        payload
    }
}
export function filterAlfa(payload){
    return {
        type:'FILTER_BY_ALFA',
        payload
    }
}
export function getDetail(id) {
    return async function (dispatch){
        var json =await axios.get(`http://localhost:3001/countries/${id}`);
        return dispatch ({
         type: 'GET_DETAIL',
         payload:json.data
        })
    }
}

 

  export function getActivities() {
    return async function (dispatch) {
     
        let resul = await axios.get(`http://localhost:3001/activity`);
        return dispatch({
          type:'GET_ACTIVITIES',
          payload: resul.data,
        });
     
    };
  }
  
  export function filterByActivities(payload) {
    return {
      type: 'FILTER_ACTIVITY',
      payload
    }
  }
 