const {Genre} = require('../db')
const { URLapiGenres } = require('../../constantes-api')
const {KEY_API} = process.env;
const axios = require ('axios')


const precarga = async function(){
  

  try {
    let genres = await axios.get(`${URLapiGenres}?${KEY_API}`) 

    genres = genres.data.results.map(g => Genre.create({name: g.name}))
    
    Promise.all(genres)
    .then(res => {
      console.log("Generos precargadas");
    });
  } catch (error) {
      next(error)
  }
  
}

module.exports = {precarga}