const { Router } = require('express');
const router = Router();
const {Videogame} = require('../db')
const {URLapiGames, URLapiGameSearch, URLapiGenres } = require('../../constantes-api')
const {KEY_API} = process.env;
const axios = require ('axios')
const { v4: uuidv4 } = require('uuid');

/*
[ ] GET /videogame/{idVideogame}:
Obtener el detalle de un videojuego en particular
Debe traer solo los datos pedidos en la ruta de detalle de videojuego
Incluir los géneros asociados
*/

router.get('/:id', async (req, res, next) => { // viene de /videogame
  const {id} = req.params
  try {
    const game = await axios.get(`${URLapiGames}/${id}?${KEY_API}`)
    return res.json({
      id: game.data.id,
      name: game.data.name,
      genres: game.data.genres.map(g => g.name)
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
*/

router.post('/', async (req, res, next) => { // viene de /videogame
  const id = uuidv4()
  // const {name, description, release_date, rating, platforms } = req.body
  try {
    const newGame = await Videogame.create({...req.body, id})
    return res.json(newGame)
  } catch (error) {
    next(error)
  }
})

module.exports = router;
