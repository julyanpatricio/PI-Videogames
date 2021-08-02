
const initialState = {
  games: []
};

function rootReducer(state = initialState, action) {
  switch(action.type){

    case "ADD_GAME":
      // let games = axios.get
      let existeGame = games.some((game) => game.name === action.payload.name)  
      if(!existeGame){  
        return {
            ...state,
          }
        } else{
          alert('Juego ya agregado')
          return state
        }
      

    case "GET_GAMES":
      return {
        ...state,
      };
    
    case 'GET_GAME_DETAIL':
      return {
        ...state,
      }

    default:
      return state
  }
}

export default rootReducer;