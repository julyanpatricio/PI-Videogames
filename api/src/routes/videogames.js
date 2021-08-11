const { Router } = require('express');
const router = Router();
// const { Videogame } = require('../db')
// const { URLapiGames, URLapiGameSearch, URLapiGenres } = require('../../constantes-api')
// const { KEY_API } = process.env;
// const axios = require('axios')
const { getGames } = require('../functions/getGames')
const { getGamesByName } = require('../functions/getGamesByName')


router.get('/', async (req, res, next) => { // viene de /videogames
  const { name } = req.query
  if (!name) res.json(await getGames(next))
  else res.json(await getGamesByName(name, next))
})


module.exports = router;
