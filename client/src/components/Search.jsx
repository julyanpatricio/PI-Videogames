import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getGames } from "../actions";
import './Games.css'

function Search() {
  const dispatch = useDispatch();
  const [gameSearch, setGameSearch] = useState({
    name: '',
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


    <form className="form-container" onSubmit={handleSubmit}> {/*este se ejecuta solo cuando haces click en el boton*/}
      <div>
        <label className="label" htmlFor="search-bar">Search Game: </label>
        <input
          id='search-bar'
          type="text"
          name="name"
          autoComplete="off"
          value={gameSearch.name}
          onChange={handleChange} //este se ejecuta "en vivo" y actualiza el estado local del componente (podria usarse para desplegar una lista desde el cuadro de busqueda que coincida con lo que vayas tipeando)
        />
      </div>
      <button type="submit">BUSCAR</button>
    </form>
  )
}

export default Search