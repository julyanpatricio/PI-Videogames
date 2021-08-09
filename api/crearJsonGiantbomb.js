const axios = require('axios')
var fs = require('fs')
//archivo creado cuando se cayo la api de rawg

axios.get('https://www.giantbomb.com/api/games/?api_key=4244ee04bf78bf82d08a6d87185d90245dfc6730&format=json&offset=400')
.then( async res => {

  let [games2,games3] = await Promise.all([
   axios.get('https://www.giantbomb.com/api/games/?api_key=4244ee04bf78bf82d08a6d87185d90245dfc6730&format=json&offset=500'),
   axios.get('https://www.giantbomb.com/api/games/?api_key=4244ee04bf78bf82d08a6d87185d90245dfc6730&format=json&offset=600')
  ])
  let games = res.data.results.concat(games2.data.results,games3.data.results)
  var gamesFormat = games.map(async game => {
    try { 
      genres = await axios.get(`https://www.giantbomb.com/api/genre/${game.id}/?api_key=4244ee04bf78bf82d08a6d87185d90245dfc6730&format=json`)
    } catch (error) {
      console.error(error)
    }
    return {
       name: game.name,
       id: game.id,
       image: game.image.original_url,
       rating: (Math.random() * 5).toFixed(2),
       description: game.deck,
       platforms: game.platforms.map(p => {return { id:p.id, name:p.name}}),
       genres: [{id:genres.data.results.id || 1 , name:genres.data.results.name || 'Action'}]
     }
    })
    gamesFormat = JSON.stringify({results : await Promise.all(gamesFormat)})
    fs.writeFile("./GAMESGIANTBOMB2.json", gamesFormat, err => console.error(err))
})
