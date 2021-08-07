const isUUID = require('is-uuid');

export function filter(games, genero, creacion){
  
  let gamesFilter = genero? games.filter(game => game.genres.some(genre => genre.name === genero)) : games
  if(creacion === 'Ambos') return gamesFilter

  return creacion === 'Real'?
    gamesFilter.filter(game => !isUUID.anyNonNil(game.id))
    : gamesFilter.filter(game => isUUID.anyNonNil(game.id))
}
