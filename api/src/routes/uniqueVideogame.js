const { Router } = require('express');
const router = Router();
const {Videogame} = require('../db')
const {URLapiGames, URLapiGameSearch, URLapiGenres } = require('../../constantes-api')
const {KEY_API} = process.env;
const axios = require ('axios')
const { v4: uuidv4 } = require('uuid');
const isUUID = require('is-uuid');

/*
[ ] GET /videogame/{idVideogame}:
Obtener el detalle de un videojuego en particular
Debe traer solo los datos pedidos en la ruta de detalle de videojuego
Incluir los géneros asociados

Ruta de detalle de videojuego: debe contener

[ ] Los campos mostrados en la ruta principal para cada videojuegos (imagen, nombre, y géneros)
[ ] Descripción
[ ] Fecha de lanzamiento
[ ] Rating
[ ] Plataformas
*/

router.get('/:id', async (req, res, next) => { // viene de /videogame
  const {id} = req.params
  try {
    if(isUUID.anyNonNil(id)){
      // var game = await Videogame.findByPk(id)
      var game = await Videogame.findAll({where:{id:id}, include: 'genres'})
      game = game[0]
    } else{
      var game = await axios.get(`${URLapiGames}/${id}?${KEY_API}`)
      game = game.data
      //descomenar las lineas de arriba cuando se arregle la api
    }

    return res.json({
      id: game.id,
      name: game.name,
      image: game.background_image || game.image,
      description: game.description,
      release_date: game.release_date,
      genres: game.genres,
      rating:game.rating
    })
  } catch (error) {
    next(error)
  }
})

/*
[ ] Videojuego con las siguientes propiedades:
ID: * No puede ser un ID de un videojuego ya existente en la API rawg
Nombre *
Descripción *
Fecha de lanzamiento
Rating
Plataformas *

[ ] POST /videogame:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
Crea un videojuego en la base de datos

Ruta de creación de videojuegos: debe contener
[ ] Un formulario controlado con los siguientes campos
Nombre
Descripción
Fecha de lanzamiento
Rating
[ ] Posibilidad de seleccionar/agregar varios géneros -------> validado con la BD genres
[ ] Posibilidad de seleccionar/agregar varias plataformas --------> poner un listado en el front y concatenar todas en un string antes de agregar a la base de datos
[ ] Botón/Opción para crear un nuevo videojuego
*/


router.post('/', async (req, res, next) => { // viene de /videogame
  const id = uuidv4()
  let {name, description, release_date, rating, platforms, genres, image } = req.body
  if(platforms instanceof(Array)){
    platforms = platforms.join()  //convierto array en string separado por coma
  }
  //tanto las platforms como los genres no va a ser necesario validar ya que en el front vamos a mostrar opciones correctas para clickear

  try {
    const newGame = await Videogame.create({id, name, description, release_date, rating, platforms, image})
    await newGame.setGenres(genres) //creo la vinculacion en la base de datos relacional (en esta tabla se van a crear tantos campos como genres haya. RECORDATORIO!!! al metodo set hay que mandarle el ID del genero en la tabla genres, no los nombres de los generos)
    return res.json(newGame)
  } catch (error) {
    next(error)
  }
})

module.exports = router;
