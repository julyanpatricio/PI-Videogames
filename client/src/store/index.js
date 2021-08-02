import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import thunk from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk)) //necesario para hacer peticiones AJAX (para que redux no tire error en la accion getMovies que no devuelve un objeto sino una funcion asincronica que luego devolvera un objeto)
);

export default store;
