const { Router } = require('express');

const VideogameRouter = require('./uniqueVideogame')
const VideogamesRouter = require('./videogames')
const GenresRouter = require('./genres')
const SendEmail = require('./sendEmail')
const router = Router();


router.use('/videogames', VideogamesRouter)
router.use('/videogame', VideogameRouter)
router.use('/genres', GenresRouter)
router.use('/sendemail',SendEmail)

module.exports = router;
