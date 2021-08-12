const { Router } = require('express');
const router = Router();
const {Genre,Videogame} = require('../db')
const {URLapiGames, URLapiGameSearch, URLapiGenres } = require('../../constantes-api')
const {KEY_API} = process.env;
const axios = require ('axios')
// const gamesJson = require('../../../../GAMES.json')
// const gamesJsonGiant = require('../../GAMESGIANTBOMB.json')

const getGames = async (next) => { // viene de /videogames

  try {
    
  
  let [gamesApi,gamesApi2,gamesApi3,gamesApi4,gamesApi5, gamesDb] = await Promise.all(
  // let [gamesApi, gamesDb] = await Promise.all(
    [
      axios.get(`${URLapiGames}?${KEY_API}`),
      axios.get(`${URLapiGames}?${KEY_API}&page=2`),
      axios.get(`${URLapiGames}?${KEY_API}&page=3`),
      axios.get(`${URLapiGames}?${KEY_API}&page=4`),
      axios.get(`${URLapiGames}?${KEY_API}&page=5`),

      // Videogame.findAll({include: 'genres'})
      Videogame.findAll({
        include: {
          model: Genre,
          through: {attributes: []}
        }
      })
    ])
    
    let gamesApi100 = gamesApi.data.results.concat(gamesApi2.data.results,gamesApi3.data.results,gamesApi4.data.results,gamesApi5.data.results)
    
  // let gamesApi100 = gamesJsonGiant.results //comentar esta lineas y descomentar las de arriba cuando de arregle la api  
  
    //por si no se puede usar el endpond de las page...
    // while((gamesApi.data.results.length) < 100){
      //   let nextPage = await axios.get(`${gamesApi.data.next}&${KEY_API}`)
      //   gamesApi.data.results = gamesApi.data.results.concat(nextPage.data.results)
      //   gamesApi.data.next = nextPage.data.next
      // }
      
    // const gamesApi100 = []
    gamesApi100 = gamesApi100.map(game => {
    // gamesApi100 = gamesApi.data.results.map(game => {
    // gamesApi.data.results.some(game => {

      let aux = {
        id: game.id,
        name: game.name,
        image: game.image || game.background_image.replace('/media/games/', '/media/resize/420/-/games/'),
        rating: game.rating,
        genres: game.genres,
        platforms: game.platforms.map(p => p.platform.name)
      }
      // gamesApi100.push(aux)
      return aux
    })

    const games = gamesDb.concat(gamesApi100)
    return games.splice(0,100)

  } catch (error) {
    next(error)
  }
  
}

module.exports = {getGames}