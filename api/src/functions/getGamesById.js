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

Ruta principal: debe contener

[ ] Input de búsqueda para encontrar videojuegos por nombre
[ ] Área donde se verá el listado de videojuegos. Deberá mostrar su:
Imagen
Nombre
Géneros
[ ] Botones/Opciones para filtrar por género y por videojuego existente o agregado por nosotros
[ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los videojuegos por orden alfabético y por rating
[ ] Paginado para ir buscando y mostrando los siguientes videojuegos, 9 juegos por pagina, mostrando los primeros 9 en la primer pagina.

*/

const getGamesById = async (name, next) => { // viene de /videogames
  try {
  
    const condition = {
      where: {name: name},
      include: 'genres'
      // limit: 15 // si los juegos de la api deben ser alojados en la base de datos primero, hacemos el filtrado de los 15 desde aca
      }

    let [gamesApi, gamesDb] = await Promise.all(
      [
        axios.get(`${URLapiGameSearch}${name}&${KEY_API}`),
        Videogame.findAll(condition)
      ])
    
    const gamesApi100 = []

    gamesApi.data.results.some(game => {
      let aux = {
        id: game.id,
        name: game.name,
        image: game.background_image,
        rating: game.rating
      }
      gamesApi100.push(aux)
      if(gamesApi100.length > 100) return true //la api solo devuelve 20. REVISAR ESO
    })

    const games = gamesDb.concat(gamesApi100)
    if(!games.length) return res.send('games not found')
    if(games.length > 15) {
      const primeros15 = []
      games.some(game => {
        primeros15.push(game)
        if(primeros15.length === 15) return true
      }) 
      return primeros15
    }
    return games
  
  } catch (error) {
      next(error)   
  }
}
module.exports = {getGamesById}
