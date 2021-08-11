import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getGames } from "../actions";
import './AddGame.css'


function AddGame() {
  const { genres, platforms } = useSelector(state => state)
  const dispatch = useDispatch()
  const { push } = useHistory()

  const [values, setValues] = useState({
    name: "",
    description: "",
    released: "2021-08-07",
    rating: 5,
    genres: [],
    platforms: [],
    image: 'https://avatars.githubusercontent.com/u/57154655?s=200&v=4'
  });

  function handleChange(e) {
    setValues(values => ({
      ...values,
      [e.target.name]: e.target.name !== 'genres' && e.target.name !== 'platforms' ? e.target.value :
        e.target.name === 'genres'
          ? !values.genres.includes(e.target.value)
            ? [...values.genres, parseInt(e.target.value)] : values.genres.filter(genre => genre !== e.target.value)
          : !values.platforms.includes(e.target.value)
            ? [...values.platforms, e.target.value] : values.platforms.filter(platform => platform !== e.target.value)
    }))
  }
  function handleSubmit(e) {
    e.preventDefault()
    axios.post('/videogame/', values)
      .then(response => {
        dispatch(getGames())
        !response.data.error? push(`/game/${response.data.id}`) :
        alert(response.data.error)
        // push(`/Error500`) 
      })
  }
  return (
    <>
      <React.Fragment>
        <h3>Add a Game</h3>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="col-sm-2 control-label">
              Name
            </label>
            <div className="col-sm-10">
              <input onChange={handleChange} value={values.name} name="name" type="text" className="form-control" />
            </div>
          </div>


          <div className="form-group">
            <label htmlFor="description" className="col-sm-2 control-label">
              Description
            </label>
            <div className="col-sm-10">
              <input onChange={handleChange} value={values.description} name="description" type="text" className="form-control" />
            </div>
          </div>


          <div className="form-group">
            <label htmlFor="released" className="col-sm-2 control-label">
              Release date
            </label>
            <div className="col-sm-10">
              <input className="form-control" type="date" id="released" name="released" onChange={handleChange}
                value={values.released}
                min="1980-01-01" max="2021-08-07"></input>
            </div>
          </div>


          <div className="form-group">
            <label htmlFor="rating" className="col-sm-2 control-label">
              Rating
            </label>
            <div className="rating">
              <input id="radio5" type="radio" name="rating" value="5" onChange={handleChange} />{/*<!--
    -->*/}<label id='estrellas' htmlFor="radio5">★</label>{/*<!--
    -->*/}<input id="radio4" type="radio" name="rating" value="4" onChange={handleChange} />{/*<!--
      -->*/}<label id='estrellas' htmlFor="radio4">★</label>{/*<!--
    -->*/}<input id="radio3" type="radio" name="rating" value="3" onChange={handleChange} />{/*<!--
    -->*/}<label id='estrellas' htmlFor="radio3">★</label>{/*<!--
    -->*/}<input id="radio2" type="radio" name="rating" value="2" onChange={handleChange} />{/*<!--
    -->*/}<label id='estrellas' htmlFor="radio2">★</label>{/*<!--
    -->*/}<input id="radio1" type="radio" name="rating" value="1" onChange={handleChange} />{/*<!--
    -->*/}<label id='estrellas' htmlFor="radio1">★</label>
            </div>
          </div>


          <div className="form-group">
            <label htmlFor="platforms" className="col-sm-2 control-label">
              Platforms
            </label>
            <div className="col-sm-10">
              {platforms.map((platform, i) =>
                <label key={i}>
                  <input onChange={handleChange} type="checkbox" name="platforms" value={platform} />
                  {platform}
                </label>
              )}
            </div>
          </div>


          <div className="form-group">
            <label htmlFor="image" className="col-sm-2 control-label">
              Image
            </label>
            <div className="col-sm-10">
              <input onChange={handleChange} value={values.image} name="image" type="text" className="form-control" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="genres" className="col-sm-2 control-label">
              Genres
            </label>

            {genres.map(genre =>
              <label key={genre.id}>
                <input onChange={handleChange} type="checkbox" name="genres" value={genre.id} />
                {genre.name}
              </label>
            )}
          </div>


          <div className="col-sm-offset-2 col-sm-10">
            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginTop: "20px" }}
            >
              Add Game
            </button>
          </div>
        </form>
      </React.Fragment>
    </>
  );
}


export default AddGame;