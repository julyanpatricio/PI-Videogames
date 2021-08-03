
const initialState = {
  games: [],
  game: undefined
};

function rootReducer(state = initialState, action) {
  switch(action.type){

    // case "ADD_GAME":
    //   // let games = axios.get
    //   let existeGame = state.games.some((game) => game.name === action.payload.name)  
    //   if(!existeGame){  
    //     return {
    //         ...state,
    //       }
    //     } else{
    //       alert('Juego ya agregado')
    //       return state
    //     }
      

    case "GET_GAMES":
      return {
        ...state,
      games: action.payload
    }
    
    case "GET_GAME_DETAIL":
      return {
        ...state,
      game: action.payload
      }

    default:
      return state
  }
}

export default rootReducer;