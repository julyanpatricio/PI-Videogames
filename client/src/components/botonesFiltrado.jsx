import React,{useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterGames, getGames, sortGames } from "../actions";
import './Games.css'
import {sort} from '../funciones/sort'
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
  
  function realizarFiltrado(){
    let filtrados = filter(gamesSinFIltro, filtrado.tipoGenero, filtrado.tipoReal)
    dispatch(filterGames(filtrados))
    // return filtrados
  }

  useEffect(() => {
    realizarFiltrado()
  }, [filtrado.tipoGenero, filtrado.tipoReal])


  return (
      <React.Fragment>
    <div className='dropdown'>
         
      <button className={`button button-primary button-primary-${botonFiltrado ? 'active' : 'inactive'}`} onClick={mostrarFiltrado}>
          Filtrar juegos
      </button>
      <button className='button' hidden={!botonFiltrado} onClick={handleChangeFilt}
        name='tipoGenero' value=''
        >Todos</button>
      
      {genres && genres.map((genre) =>(
        <button className='button' hidden={!botonFiltrado} onClick={handleChangeFilt}
        name='tipoGenero' value={genre.name} key={genre.id}
        >{genre.name}</button>
        ))}
	  </div>
        </React.Fragment>

  )
};

export default MostrarBotonFilt;