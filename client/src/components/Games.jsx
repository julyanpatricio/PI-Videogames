import React,{useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGames } from "../actions";
import { Link } from 'react-router-dom'




function Games() {
  const games = useSelector((state) => state.games);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGames());
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
            <label className="label" htmlFor="title">Película: </label>
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