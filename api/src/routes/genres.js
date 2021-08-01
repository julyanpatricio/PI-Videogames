const { Router } = require('express');
const router = Router();
const {Genre} = require('../db')
const { URLapiGenres } = require('../../constantes-api')
const {KEY_API} = process.env;
const axios = require ('axios')

/*
[ ] GET /genres:
Obtener todos los tipos de géneros de videojuegos posibles
En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
*/
router.get('/', async (req, res, next) => { // viene de /genres
   try {
      const genres = await Genre.findAll()
      res.json(genres)
   } catch (error) {
      next(error)
   }
})


module.exports = router;
