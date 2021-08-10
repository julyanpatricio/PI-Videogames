import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  sortGames } from "../actions";
import { sort } from '../funciones/sort';
import './Games.css';

function MostrarBotonOrd() {
  const games = useSelector((state) => state.games);
  const dispatch = useDispatch();

  const [botonOrdenamiento, setMostrarOrdenamiento] = useState(false)

  const [ordenamiento, setOrdenamiento] = useState({
    modo: 'Por rating', //alfabeticamente o por rating
    direccion: 'Descendente', //descendente o ascendente
    games:games
  })

  function mostrarOrdenamiento(){
    setMostrarOrdenamiento(!botonOrdenamiento)
  }

  function handleChangeOrd(e) {
    setOrdenamiento(ordenamiento => ({
          ...ordenamiento,
          games:games,
          [e.target.name]: e.target.value
        }))
    if(e.target.name === 'modo') dispatch(sortGames( sort(games, e.target.value, ordenamiento.direccion))) 
    if(e.target.name === 'direccion') dispatch(sortGames( sort(games, ordenamiento.modo, e.target.value))) 
  }


  return (
    <div className='dropdown'>
      <button className={`button button-primary button-primary-${botonOrdenamiento ? 'active' : 'inactive'}`} onClick={mostrarOrdenamiento}>
          Ordenar juegos
      </button>
      <div>
        <button className='button' hidden={!botonOrdenamiento} onClick={handleChangeOrd}
        name='modo' value='Alfabeticamente'
        >Alfabeticamente</button>
        <button className='button' hidden={!botonOrdenamiento} onClick={handleChangeOrd}
        name='modo' value='Por rating'
        >Por rating</button>
        <button className='button' hidden={!(botonOrdenamiento && ordenamiento.modo)} onClick={handleChangeOrd}
        name='direccion' value='Ascendente'
        >ascendente</button>
        <button className='button' hidden={!(botonOrdenamiento && ordenamiento.modo)} onClick={handleChangeOrd}
        name='direccion' value='Descendente'
        >descendente</button>
      </div>
	  </div>

  )
};

export default MostrarBotonOrd;