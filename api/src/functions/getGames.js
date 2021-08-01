const { Router } = require('express');
const router = Router();
const {Genre,Videogame} = require('../db')
const {URLapiGames, URLapiGameSearch, URLapiGenres } = require('../../constantes-api')
const {KEY_API} = process.env;
const axios = require ('axios')

const getGames = async (next) => { // viene de /videogames

  try {
    
  
  let [gamesApi, gamesDb] = await Promise.all(
    [
      axios.get(`${URLapiGames}?${KEY_API}`),
      Videogame.findAll({include: 'genres'})
      // Videogame.findAll({
      //   include: {
      //     model: Genre,
      //     through: {attributes: []}
      //   }
      // })
    ])
    
    const gamesApi100 = []
    
    gamesApi.data.results.some(game => {
      let aux = {
        id: game.id,
        name: game.name,
        image: game.background_image,
        rating: game.rating,
        genres: game.genres.map(g => g.name)
      }
      gamesApi100.push(aux)
      if(gamesApi100.length > 100) return true //la api solo devuelve 20. REVISAR ESO
    })

    // gamesDb = gamesDb.map(game => {
    //   console.log(game)
    //   return {
    //     ...game,
    //     genres: game.genres.map(g => g.dataValues)
    //   }
    // })
    const games = gamesDb.concat(gamesApi100)

    return games

  } catch (error) {
    next(error)
  }
  
}

module.exports = {getGames}