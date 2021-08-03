import React,{useEffect, useState} from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getGames } from "../actions";

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
  const dispatch = useDispatch()
  const { push } = useHistory()

  const [values, setValues] = useState({
    name: "",
    description: "",
    release_date: "",
    rating: 0,
    genres:['1'],
    platforms: '',
    image:''
  });

  function handleChange(e) {
    setValues(values => ({
      ...values,
      [e.target.name]: e.target.value
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
          <div className="col-sm-10">
            <textarea onChange={handleChange} value={values.rating} name="rating" type='number' className="form-control"></textarea>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="platforms" className="col-sm-2 control-label">
            Platforms
          </label>
          <div className="col-sm-10">
            <input onChange={handleChange} value={values.platforms} name="platforms" type="text" className="form-control" />
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
          <p>
            {/* {"Categorías:"}
            <br />
            <label>
              <input type="checkbox" name="categories" value="1" />
              Autos
            </label>
            <br />
            <label>
              <input type="checkbox" name="categories" value="2" /> Deportes
            </label>
            <br />
            <label>
              <input type="checkbox" name="categories" value="3" /> Videojuegos
            </label> */}
          </p>
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
    </>
  );
}


export default AddGame;