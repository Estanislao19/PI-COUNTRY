

const initialState ={
    
    countries: [],
    allCountries:[],
    activities: [],
    detail:[],
    
    
}




function rootReducer (state=initialState,action) {
switch(action.type){
    case 'GET_COUNTRIES':
        return {
            ...state, // estado anterior
            countries:action.payload,// manda todo lo que te mande 'GETCOUNTRIES
            allCountries:action.payload,
            
        }
        case 'GET_ACTIVITIES' :
            return {
                ...state,
                 activities:action.payload,
            }
        case 'FITER_BY_CONTINENTS' : // lo que tengo en SELECT va a llegar a la action por payload
            const allPai = state.allCountries
            const statusFiltered = action.payload === 'All' ? allPai : allPai.filter(el => el.continents === action.payload) // si mi payload es todo devolveme todo sino devolveme los continentes
            return{
                ...state, 
                countries:statusFiltered,
                
            }
            case 'GET_SEARCH':
               
                return {
                    ...state, 
                    countries:action.payload,
                }
                case 'POST_ACTIVITY':
                    return {
                        ...state,
                    }
            case 'FILTER_BY_POPULATION':
                const filtered = action.payload === 'asendente' ? 
                state.countries.sort(function(a,b){
                  if(a.population > b.population){
                      return -1;
                  }
                  if(b.population > a.population){
                      return 1;
                  }
                  return 0;
                }):
                state.countries.sort(function(a,b){
                    if (a.population > b.population) {
                        return 1;
                    }
                    if (b.population > a.population) {
                        return -1;
                    }
                    return 0;
              });
              return {
                  ...state,
                  countries:filtered,
              
                }
               
        case 'FILTER_ACTIVITY':
            const actFiltered = state.countries.filter(c => c.activities && c.activities.map(a => a.name).includes(action.payload))
            return {
                ...state, 
                countries: actFiltered,
            }

                
                    case 'GET_DETAIL':
                        return {
                          ...state,
                          detail: action.payload,
                        };
                         
                        
                
                case 'FILTER_BY_ALFA':
                    const alfaname = action.payload=== 'asc' ?
                    state.countries.sort(function(a,b){
                        if(a.name> b.name){ // compara el que encunetra primero y el que ecnuentra despues
                            return 1; 

                        }
                        if(b.name>a.name){
                            return -1;
                        }
                        return 0;
                    }):
                    state.countries.sort(function(a,b){
                        if(a.name>b.name){
                            return -1;
                        }
                        if(b.name>a.name){
                            return 1;
                        }
                        return 0;
                    })
                    return {
                        ...state,
                        countries:alfaname
                    }
            
                
        default:
            return state;
}
}


export default rootReducer;