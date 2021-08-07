import React,{useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterGames, getGames, sortGames } from "../actions";
import './Games.css'
import {sort} from '../funciones/sort'
import {filter} from '../funciones/filter'

function MostrarBotonFilt() {
  const gamesSinFIltro = useSelector((state) => state.gamesSinFIltro);
  const dispatch = useDispatch();

  const [botonFiltrado, setMostrarFiltrado] = useState(false)

  const [filtrado, setFiltrado] = useState({
    tipoGenero: '', //alfabeticamente o por rating
    tipoReal: 'Ambos' //descendente o ascendente
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
    dispatch(filterGames( filtrados))
  }, [filtrado.tipoGenero,filtrado.tipoReal,dispatch,gamesSinFIltro])


  return (
    <div className='dropdown'>
      <div className='title pointerCursor'>Seleccione una opción <i className="fa fa-angle-right"></i></div>
      
      <button className={`button button-primary button-primary-${botonFiltrado ? 'active' : 'inactive'}`} onClick={mostrarFiltrado}>
          Filtrar juegos
      </button>
        <button className='button' hidden={!botonFiltrado} onClick={handleChangeFilt}
        name='tipoGenero' value='Action'
        >Action</button>
        <button className='button' hidden={!botonFiltrado} onClick={handleChangeFilt}
        name='tipoGenero' value='Shooter'
        >Shooter</button>
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

  )
};

export default MostrarBotonFilt;