const { Router } = require('express');
const router = Router();
const {Videogame} = require('../db')
const {URLapiGames, URLapiGameSearch, URLapiGenres } = require('../../constantes-api')
const {KEY_API} = process.env;
const axios = require ('axios')
const { v4: uuidv4 } = require('uuid');
const isUUID = require('is-uuid');


router.get('/:id', async (req, res, next) => { // viene de /videogame
  const {id} = req.params
  try {
    if(isUUID.anyNonNil(id)){

      var game = await Videogame.findAll({where:{id:id}, include: 'genres'})
      game = game[0]
    } else{
      var game = await axios.get(`${URLapiGames}/${id}?${KEY_API}`)
      game = game.data
      
    }

    return res.json({
      id: game.id,
      name: game.name,
      image: game.background_image || game.image,
      image_aditional: game.background_image_additional || null,
      description: game.description,
      released: game.released,
      rating:game.rating,
      genres: game.genres,
      platforms: game.platforms
    })
  } catch (error) {
    next(error)
  }
})



router.post('/', async (req, res, next) => { // viene de /videogame
  const id = uuidv4()
  let {name, description, released, rating, platforms, genres, image } = req.body
  if(!description || !platforms || !name) return res.json({"error": "you must provide a name, a description and at least one platform"})
  if(await Videogame.findOne({where:{name:name}})) return res.json({"error": "The name already exists in the database"})
  
  try {
    const newGame = await Videogame.create({id, name, description, released, rating, platforms, image})
    await newGame.setGenres(genres) //creo la vinculacion en la base de datos relacional (en esta tabla se van a crear tantos campos como genres haya. RECORDATORIO!!! al metodo set hay que mandarle el ID del genero en la tabla genres, no los nombres de los generos)
    return res.json(newGame)
  } catch (error) {
    next(error)
  }
})


// -------- Con .Then ----------
// router.post('/', (req, res, next) => { // viene de /videogame
//   const id = uuidv4()
//   let {name, description, released, rating, platforms, genres, image } = req.body
//   if(!description || !platforms || !name) return res.json({"error": "you must provide a name, a description and at least one platform"})
//   return Videogame.findOne({where:{name:name}}) 
//   .then(resPromise => {
//     if(resPromise)  return res.json({"error": "The name already exists in the database"})
//     return Videogame.create({id, name, description, released, rating, platforms, image})
//   })
//   .then(newGame => {
//     newGame.setGenres(genres)
//     return res.json(newGame)
//   })
//   .catch((error) => next(error))
// })

module.exports = router;
