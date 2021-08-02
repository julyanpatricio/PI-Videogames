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

export function getGameDetail(id){
  return function(dispatch) {
    return axios.get('/videogame') 
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "GET_GAME_DETAIL", payload: json });
      });
  };
}

export function addGame(payload) {
  return { type: "ADD_GAME", payload };
}
