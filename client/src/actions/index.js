import axios from "axios";

export function getGames(name) {
  return function(dispatch) {
    return axios.get('/videogames') //axios tiene como default localhost:3001
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "GET_GAMES", payload: json });
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
