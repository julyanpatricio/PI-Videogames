import React,{ useState} from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getGames } from "../actions";
import './AddGame.css'
/*
Ruta de creación de videojuegos: debe contener

 Un formulario controlado con los siguientes campos
Nombre
Descripción
Fecha de lanzamiento
Rating
 Posibilidad de seleccionar/agregar varios géneros
 Posibilidad de seleccionar/agregar varias plataformas
 Botón/Opción para crear un nuevo videojuego

*/
function AddGame() {
  const {genres,platforms} = useSelector(state => state)
  const dispatch = useDispatch()
  const { push } = useHistory()

  const [values, setValues] = useState({
    name: "",
    description: "",
    release_date: "",
    rating: 5,
    genres:[],
    platforms: [],
    image:''
  });

  function handleChange(e) {
    setValues(values => ({
      ...values,
      [e.target.name]: e.target.name !== 'genres' && e.target.name !== 'platforms' ? e.target.value :
            e.target.name !== 'genres' 
            ? !values.genres.includes(e.target.value) 
                ? [...values.genres, e.target.value] : values.genres.filter(genre => genre !== e.target.value)
            : !values.platforms.includes(e.target.value) 
            ? [...values.platforms, e.target.value] : values.platforms.filter(platform => platform !== e.target.value)
    }))
  }
  function handleSubmit(e) {
    e.preventDefault()
    axios.post('/videogame/', values)
    .then(response => {
      dispatch(getGames())
      push(`/game/${response.data.id}`)
    })
  }
  return (
    <>
    <React.Fragment>
      <h3>Add a Page</h3>
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
          <label htmlFor="release_date" className="col-sm-2 control-label">
            release_date
          </label>
          <div className="col-sm-10">
            <input onChange={handleChange} value={values.release_date} name="release_date" type="text" className="form-control" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="rating" className="col-sm-2 control-label">
            Rating (de 1 a 5)
          </label>
          <div className="rating">
            
            {/* <select name="rating" value='5' onChange={handleChange}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="2">4</option>
              <option value='5'>5</option>
            </select> */}
            <input id="radio1" type="radio" name="estrellas" value="5" />{/*<!--
    -->*/}<label for="radio1">★</label>{/*<!--
    -->*/}<input id="radio2" type="radio" name="estrellas" value="4" />{/*<!--
    -->*/}<label for="radio2">★</label>{/*<!--
    -->*/}<input id="radio3" type="radio" name="estrellas" value="3" />{/*<!--
    -->*/}<label for="radio3">★</label>{/*<!--
    -->*/}<input id="radio4" type="radio" name="estrellas" value="2" />{/*<!--
    -->*/}<label for="radio4">★</label>{/*<!--
    -->*/}<input id="radio5" type="radio" name="estrellas" value="1" />{/*<!--
    -->*/}<label for="radio5">★</label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="platforms" className="col-sm-2 control-label">
            Platforms
          </label>
          <div className="col-sm-10">
          {platforms.map((platform,i) => 
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
            style={{ marginTop: "10px", float: "right" }}
            >
            SUBMIT
          </button>
        </div>
      </form>
            </React.Fragment>
    </>
  );
}


export default AddGame;