const { Router } = require('express');

const VideogameRouter = require('./uniqueVideogame')
const VideogamesRouter = require('./videogames')
const GenresRouter = require('./genres')

const router = Router();


router.use('/videogames', VideogamesRouter)
router.use('/videogame', VideogameRouter)
router.use('/genres', GenresRouter)

module.exports = router;
