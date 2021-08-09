import React,{useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterGames} from "../actions";
import './Games.css'

import {filter} from '../funciones/filter'

function MostrarBotonFilt() {
  const [gamesSinFIltro, genres] = useSelector((state) => [state.gamesSinFIltro, state.genres]);
  const dispatch = useDispatch();

  const [botonFiltrado, setMostrarFiltrado] = useState(false)

  const [filtrado, setFiltrado] = useState({
    tipoGenero: '', //alfabeticamente o por rating
    tipoReal: 'Ambos', //descendente o ascendente
  })

  function handleChangeFilt(e) {
    setFiltrado(filtrado => ({
      ...filtrado,
      [e.target.name]: e.target.value
    }))
  }
  
  function mostrarFiltrado(){
    setMostrarFiltrado(!botonFiltrado)
  }

  useEffect(() => {
    let filtrados = filter(gamesSinFIltro, filtrado.tipoGenero, filtrado.tipoReal)
    dispatch(filterGames(filtrados))
  }, [filtrado.tipoGenero, filtrado.tipoReal,gamesSinFIltro,dispatch])

  return (
    <React.Fragment>
         
      <button className={`button button-primary button-primary-${botonFiltrado ? 'active' : 'inactive'}`} onClick={mostrarFiltrado}>
          Filtrar juegos
      </button>
    <div className='dropdown'>
      <button className='button' hidden={!botonFiltrado} onClick={handleChangeFilt}
        name='tipoGenero' value=''
        >Todos</button>
      
      {genres && genres.map((genre) =>(
        <button className='button' hidden={!botonFiltrado} onClick={handleChangeFilt}
        name='tipoGenero' value={genre.name} key={genre.id}
        >{genre.name}</button>
        ))}
      <button className='button' hidden={!(botonFiltrado)} onClick={handleChangeFilt}
        name='tipoReal' value='Real'
        >Real</button>
        <button className='button' hidden={!(botonFiltrado )} onClick={handleChangeFilt}
        name='tipoReal' value='Creado'
        >Creado</button>
        <button className='button' hidden={!(botonFiltrado )} onClick={handleChangeFilt}
        name='tipoReal' value='Ambos'
        >Ambos</button>
	  </div>
        </React.Fragment>

  )
};

export default MostrarBotonFilt;