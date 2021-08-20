const { Router } = require('express');
const router = Router();
const { Videogame } = require('../db')
const { URLapiGames, URLapiGameSearch, URLapiGenres } = require('../../constantes-api')
const { KEY_API } = process.env;
const axios = require('axios')


const getGamesByName = async (name, next) => { // viene de /videogames
  try {

    const condition = {
      where: { name: name },
      include: 'genres'
      
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
          image: game.image || game.background_image?.replace('/media/games/', '/media/resize/420/-/games/'),
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
