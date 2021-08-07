import React,{useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGames } from "../actions";
import { Link } from 'react-router-dom'
import './Games.css'
import MostrarBotonOrd from "./BotonesOrdenamiento";
import MostrarBotonFilt from "./botonesFiltrado";



function Games() {
  const [games] = useSelector((state) => [state.games]);
  const dispatch = useDispatch();
  
  // useEffect(() => {
  //   console.log(games)
  //   dispatch(getGames());
  // }, [dispatch]);

  useEffect(() => {
    console.log('usseefect')
    dispatch(getGames()); //trae una nueva lista de juegos
  }, [dispatch]);

  const [gameSearch, setGameSearch] = useState({
    name: ''
  });
  

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

    <MostrarBotonOrd />
    <MostrarBotonFilt />
    <h3>Games</h3>
    <hr />
    <div className='gamesList'>
      {games.map((game) => (
        <React.Fragment key={game.id}>
          <ul className="list-unstyled">
        <Link to={`/game/${game.id}`}>
          <h4>{game.name}</h4>
          </Link>
          <img className='gameImage' width={420} height={300} src={game.image} alt={game.name} />
          
          <span>Genres: </span>
          {game.genres.map((genre,i) => (
            i === 0? <span key={genre.games_count || i}>{genre.name}</span>
            : <span key={genre.games_count || i}>{`, ${genre.name}`}</span>
          ))}
    </ul>
        </React.Fragment>
      ))}
    </div>
  </>
  )
}

export default Games;