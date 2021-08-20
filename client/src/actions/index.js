import axios from "axios";


export function getGames(name) {
  return function(dispatch) {
    let path = name? `?name=${name}` : '/'
    return axios.get(`/videogames${path}`) //axios tiene como default localhost:3001
      .then(json => {
        dispatch({ type: "GET_GAMES", payload: json.data });
      });
  };
}

export function getGenres(){
  return function(dispatch){
    return axios.get('/genres')
    .then(json => {
      dispatch({type: "GET_GENRES", payload: json.data})
    })
  }
}

export function getGameDetail(id){
  return function(dispatch) {
    return axios.get(`/videogame/${id}`) 
      .then(json => {
        dispatch({ type: "GET_GAME_DETAIL", payload: json.data });
      })
      .catch(error => {
            return dispatch({ type: "GET_GAME_DETAIL", payload: null })
          })
  };
}

export function changePage({currentPage,startIndex,endIndex}){
  return {
    type: "CHANGE_PAGE",
    payload: {currentPage,startIndex,endIndex}
  }
}

export function clearPage() {
  return { type: 'GET_GAME_DETAIL', payload: undefined} 
}

export function sortGames(games){
  return { type: "SORT_GAMES", payload: games };
}

export function filterGames(games){
  return {type: "FILTER_GAMES", payload: games}
}
