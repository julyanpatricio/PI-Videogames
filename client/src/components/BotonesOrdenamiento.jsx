import React, { useState } from "react";
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
    games: games
  })

  function mostrarOrdenamiento() {
    setMostrarOrdenamiento(!botonOrdenamiento)
  }

  function handleChangeOrd(e) {
    setOrdenamiento(ordenamiento => ({
      ...ordenamiento,
      games: games,
      [e.target.name]: e.target.value
    }))
    if (e.target.name === 'modo') dispatch(sortGames(sort(games, e.target.value, ordenamiento.direccion)))
    if (e.target.name === 'direccion') dispatch(sortGames(sort(games, ordenamiento.modo, e.target.value)))
  }


  return (
    <React.Fragment>
      <div className='button-menu'>
        <div className='buttons-menu-list'>
          <button className='button button-menu-list' hidden={!botonOrdenamiento} onClick={handleChangeOrd}
            name='modo' value='Alfabeticamente'
          >Alphabetically</button>
          <button className='button button-menu-list' hidden={!botonOrdenamiento} onClick={handleChangeOrd}
            name='modo' value='Por rating'
          >By rating</button>
          <p></p>
          <button className='button button-menu-list' hidden={!botonOrdenamiento} onClick={handleChangeOrd}
            name='direccion' value='Ascendente'
          >Ascending</button>
          <button className='button button-menu-list' hidden={!botonOrdenamiento} onClick={handleChangeOrd}
            name='direccion' value='Descendente'
          >Descending</button>
        </div>
        <button className={`button button-primary button-primary-${botonOrdenamiento ? 'active' : 'inactive'}`} onClick={mostrarOrdenamiento}>
          Order games
        </button>
      </div>
    </React.Fragment>
  )
};

export default MostrarBotonOrd;