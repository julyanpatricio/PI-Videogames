const { Router } = require('express');
const router = Router();
const {Videogame} = require('../db')
const {URLapiGames, URLapiGameSearch, URLapiGenres } = require('../../constantes-api')
const {KEY_API} = process.env;
const axios = require ('axios')

/*
[ ] GET /videogames:
Obtener un listado de los videojuegos
Debe devolver solo los datos necesarios para la ruta principal
[ ] GET /videogames?name="...":
Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
Si no existe ningún videojuego mostrar un mensaje adecuado
*/

router.get('/', async (req, res, next) => { // viene de /videogames
  const {name} = req.query
  
  const condition = name? {
    where: {name: name},
    // limit: 15 // si los juegos de la api deben ser alojados en la base de datos primero, hacemos el filtrado de los 15 desde aca
    }
  : {}

  let gamesApi = name ?
      axios.get(`${URLapiGameSearch}${name}&${KEY_API}`) //promesa de la api para busqueda
    : axios.get(`${URLapiGames}?${KEY_API}`) //promesa de la api para all games

  let gamesDb = Videogame.findAll(condition) //promesa de la BD (busqueda y all games segun condicion)
    
  Promise.all([gamesApi, gamesDb])
  .then(response => {
    [gamesApi, gamesDb] = response
    const gamesApi100 = []

    gamesApi.data.results.some(game => {
      let aux = {
        id: game.id,
        name: game.name
      }
      gamesApi100.push(aux)
      if(gamesApi100.length > 100) return true //la api solo devuelve 20. REVISAR ESO
    })

    const games = gamesDb.concat(gamesApi100)
    

    if(name && !games.length) return res.send('games not found')
    if(name && games.length > 15) {
      const primeros15 = []
      games.some(game => {
        primeros15.push(game)
        if(primeros15.length === 15) return true
      }) 
      return res.json(primeros15)
    }
    res.json(games)
  })
  .catch (error => next(error))


})


module.exports = router;
