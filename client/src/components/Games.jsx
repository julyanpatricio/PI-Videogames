import React,{useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGames, sortGames } from "../actions";
import { Link } from 'react-router-dom'
import './Games.css'
import {sort} from '../funciones/sort'




function Games() {
  const games = useSelector((state) => state.games);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGames());
  }, [dispatch]);

  const [gameSearch, setGameSearch] = useState({
    name: ''
  });

  const [filtrado, setFiltrado] = useState({
    genero: '', //desplegable para elegir un genero entre muchos
    ubicacion: 'ambos' //desplegable para elegir existente, creado, ambos
  })

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

  function handleChange(e) {
    setGameSearch(gameSearch => ({
      ...gameSearch,
      [e.target.name]: e.target.value
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(getGames(gameSearch.name))
    }


  return (
      <>
        <form className="form-container" onSubmit={handleSubmit}> {/*este se ejecuta solo cuando haces click en el boton*/ }
          <div>
            <label className="label" htmlFor="title">Search Game: </label>
            <input
              type="text"
              name="name"
              autoComplete="off"
              value={gameSearch.name}
              onChange={handleChange} //este se ejecuta "en vivo" y actualiza el estado local del componente (podria usarse para desplegar una lista desde el cuadro de busqueda que coincida con lo que vayas tipeando)
            />
          </div>
          <button type="submit">BUSCAR</button>
        </form>

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

    <h3>Games</h3>
    <hr />
    <ul className="list-unstyled">
      {games.map((game) => (
        <React.Fragment key={game.id}>
          
        <Link to={`/game/${game.id}`}>
          <h3>{game.name}</h3>
          </Link>
          
          <h4>Genres</h4>
          {game.genres.map((genre,i) => (
            <p key={genre.games_count || i}>{genre.name}</p>
          ))}
          <img width={420} height={300} src={game.image} alt={game.name} />
        </React.Fragment>
      ))}
    </ul>
  </>
  )
}

export default Games;