import React from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import './Games.css'

function GamesList() {
  const { games, startIndex, endIndex } = useSelector((state) => state);

  // Imagen
  // Nombre
  // Géneros

  return (
    <div className='gamesList'>
      {games.slice(startIndex, endIndex).map((game) => (
        <React.Fragment key={game.id}>
          <ul className="list-unstyled">
            <Link to={`/game/${game.id}`}>
              <h4>{game.name}</h4>
            </Link>
            <img className='gameImage' width={420} height={300} src={game.image} alt={game.name} />

            <span>Genres: </span>
            {game.genres.map((genre, i) => (
              i === 0 ? <span key={genre.games_count || i}>{genre.name}</span>
                : <span key={genre.games_count || i}>{`, ${genre.name}`}</span>
            ))}
          </ul>
        </React.Fragment>
      ))}
    </div>
  )
}
export default GamesList