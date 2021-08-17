import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterGames } from "../actions";
import './Games.css'

import { filter } from '../funciones/filter'

function MostrarBotonFilt() {
  const [gamesSinFIltro, genres] = useSelector((state) => [state.gamesSinFIltro, state.genres]);
  const dispatch = useDispatch();

  const [botonFiltrado, setMostrarFiltrado] = useState(false)

  const [filtrado, setFiltrado] = useState({
    tipoGenero: '', //alfabeticamente o por rating
    tipoReal: 'Ambos', //descendente o ascendente
  })

  function mostrarFiltrado() {
    setMostrarFiltrado(!botonFiltrado)
  }

  function handleChangeFilt(e) {
    setFiltrado(filtrado => ({
      ...filtrado,
      [e.target.name]: e.target.value
    }))
    if (e.target.name === 'tipoGenero') dispatch(filterGames(filter(gamesSinFIltro, e.target.value, filtrado.tipoReal)))
    if (e.target.name === 'tipoReal') dispatch(filterGames(filter(gamesSinFIltro, filtrado.tipoGenero, e.target.value)))
  }

  return (
    <React.Fragment>
      <div className='button-menu'>
        <button className={`button button-primary button-primary-${botonFiltrado ? 'active' : 'inactive'}`} onClick={mostrarFiltrado}>
          Filter games
        </button>
        <div className='buttons-menu-list'>
          <button className='button button-menu-list' hidden={!botonFiltrado} onClick={handleChangeFilt}
            name='tipoGenero' value=''
          >All</button>

          {genres && genres.map((genre) => (
            <button className='button button-menu-list' hidden={!botonFiltrado} onClick={handleChangeFilt}
              name='tipoGenero' value={genre.name} key={genre.id}
            >{genre.name}</button>
          ))}
          <p></p>
          <button className='button button-menu-list' hidden={!(botonFiltrado)} onClick={handleChangeFilt}
            name='tipoReal' value='Real'
          >Original</button>
          <button className='button button-menu-list' hidden={!(botonFiltrado)} onClick={handleChangeFilt}
            name='tipoReal' value='Creado'
          >Created</button>
          <button className='button button-menu-list' hidden={!(botonFiltrado)} onClick={handleChangeFilt}
            name='tipoReal' value='Ambos'
          >Both</button>
        </div>
      </div>
    </React.Fragment>

  )
};

export default MostrarBotonFilt;