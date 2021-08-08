import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sortGames } from "../actions";
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

  function handleChangeOrd(e) {
    setOrdenamiento(ordenamiento => ({
      ...ordenamiento,
      games:games,
      [e.target.name]: e.target.value
    }))
  }

  useEffect(() => {
    dispatch(sortGames( sort(ordenamiento.games, ordenamiento.modo, ordenamiento.direccion)))
  }, [dispatch, ordenamiento.modo, ordenamiento.direccion, ordenamiento.games])

  function mostrarOrdenamiento(){
    setMostrarOrdenamiento(!botonOrdenamiento)
  }

  return (
    <div className='dropdown'>
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