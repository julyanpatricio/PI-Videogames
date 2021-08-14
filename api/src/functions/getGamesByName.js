const { Router } = require('express');
const router = Router();
const { Videogame } = require('../db')
const { URLapiGames, URLapiGameSearch, URLapiGenres } = require('../../constantes-api')
const { KEY_API } = process.env;
const axios = require('axios')

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

const getGamesByName = async (name, next) => { // viene de /videogames
  try {

    const condition = {
      where: { name: name },
      include: 'genres'
      // limit: 15 // si los juegos de la api deben ser alojados en la base de datos primero, hacemos el filtrado de los 15 desde aca
    }

    let [gamesApi, gamesDb] = await Promise.all(
      [
        axios.get(`${URLapiGameSearch}${name}&${KEY_API}`),
        Videogame.findAll(condition)
      ])

    const games = gamesDb.concat(gamesApi.data.results)
    if (!games.length) return res.send('games not found')
    if (games.length > 15) {
      const primeros15 = []
      games.some(game => {
        let aux = {
          id: game.id,
          name: game.name,
          wallpaper:game.image ||game.background_image,
          image: game.image || game.background_image.replace('/media/games/', '/media/resize/420/-/games/'),
          rating: game.rating,
          genres: game.genres
        }
        primeros15.push(aux)
        if (primeros15.length === 15) return true
      })
      return primeros15
    }
    return games

  } catch (error) {
    next(error)
  }
}
module.exports = { getGamesByName }
