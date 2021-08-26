import React from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import './GamesList.css'

function GamesList() {
  let { games, startIndex, endIndex } = useSelector((state) => state);

  return (
    <div className='gamesList'>
      { games.slice(startIndex, endIndex).map((game, i) => (
        <React.Fragment key={game.id}>
          <Link to={`/game/${game.id}`}>
            <div className='card bg-dark text-white border-0'>
              <div>
                <div className='img-zoom img-zoom-container card-background bg-secondary'>
                  <img className='card-img-top'  src={game.image} alt={game.name} />
                </div>
                <div className='badge-pill badge-warning position-absolute right-badge'>★{game.rating}/5</div>
              </div>
              <div className='card-body'>
                <div className='badge-pill badge-dark position-absolute badge-position'>
                  #<strong>{startIndex + i + 1}</strong>
                </div>
              </div>
              <h2 className='position-absolute h2-position'>
                {game.name}
              </h2>
              <div className='position-absolute genre-badge-position'>
                {game.genres.map((genre, i) => (
                  <div className='badge badge-dark genre-badge-margin' key={i + 1}>
                    {genre.name}
                  </div>
                ))}
              </div>
            </div>
          </Link>
        </React.Fragment>
      )) 
    }
    </div>
  )
}
export default GamesList