import React,{useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGames, sortGames } from "../actions";
import './Games.css'
import {sort} from '../funciones/sort'

function MostrarBotonOrd() {
  const games = useSelector((state) => state.games);
  const dispatch = useDispatch();

  const [botonOrdenamiento, setMostrarOrdenamiento] = useState(false)

  const [ordenamiento, setOrdenamiento] = useState({
    modo: '', //alfabeticamente o por rating
    direccion: '' //descendente o ascendente
  })

  function handleChangeOrd(e) {
    setOrdenamiento(ordenamiento => ({
      ...ordenamiento,
      [e.target.name]: e.target.value
    }))
    if(e.target.name === 'direccion') {
      dispatch(sortGames( sort(games, ordenamiento.modo, ordenamiento.direccion)))
      mostrarOrdenamiento()
    }
  }

  function mostrarOrdenamiento(){
    setMostrarOrdenamiento(!botonOrdenamiento)
  }

  return (
    <div className='dropdown'>
      <div className='title pointerCursor'>Seleccione una opción <i className="fa fa-angle-right"></i></div>
      
      <button className={`button button-primary button-primary-${botonOrdenamiento ? 'active' : 'inactive'}`} onClick={mostrarOrdenamiento}>
          Ordenar juegos
      </button>
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

  )
};

export default MostrarBotonOrd;