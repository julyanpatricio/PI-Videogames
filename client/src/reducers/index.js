
const initialState = {
  games: [],
  gamesSinFIltro:[],
  game: undefined,
  n_Sort:0,
  n_Filter:0,

  totalGames: 9,
  gamesForPage: 9, //cantidad de juegos a mostrar por pagina
  totalPages: 1,
  pagesToShow: 5,
  currentPage: 1,
  startIndex:0,
  endIndex:9
  
};

function rootReducer(state = initialState, action) {

  console.log('accion recibida, actualizando estado con', action.payload);
  switch(action.type){

  case "CHANGE_PAGE":
    return {
      ...state,
      currentPage:action.payload.currentPage,
      startIndex:action.payload.startIndex,
      endIndex:action.payload.endIndex,
      
    }      

    case "GET_GAMES":
      return {
        ...state,
      games: action.payload,
      gamesSinFIltro: action.payload,
      totalGames: action.payload.length,
      pagesToShow: 5,
      totalPages: Math.ceil(action.payload.length / state.gamesForPage),
      currentPage:1,
      startIndex:0,
      endIndex:9

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