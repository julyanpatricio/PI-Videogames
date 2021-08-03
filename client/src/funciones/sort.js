
export function sort(games, modo, direccion){

  let compare = modo === 'Alfabeticamente'? 'name':'rating'
    
    let sortedGames = games.sort(function (a, b) {
      if (a[compare] > b[compare]) return direccion==='Ascendente'? -1 : 1
      if (a[compare] < b[compare]) return direccion==='Ascendente'? 1 : -1
      return 0;
    });
    return sortedGames
  }
