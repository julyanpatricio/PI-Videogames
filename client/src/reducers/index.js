
const initialState = {
  games: [],
  gamesSinFIltro:[],
  game: undefined,
  n_Sort:0,
  n_Filter:0
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
      games: action.payload,
      gamesSinFIltro: action.payload
    }
    
    case "GET_GAME_DETAIL":
      return {
        ...state,
      game: action.payload
      }

    case "SORT_GAMES":

      return {
        ...state,
      games: action.payload,
      n_Sort: ++state.n_Sort
      }

    case "FILTER_GAMES":
      return {
        ...state,
        games: action.payload,
        n_Filter: ++state.n_Filter
      }

    default:
      return state
  }
}

export default rootReducer;