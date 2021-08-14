import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearPage, getGameDetail } from "../actions";
import './Game.css'
import parse from 'html-react-parser'


function Game() {
  const game = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const { id } = useParams();

  // cuando se monta la pagina hace el fetch
  useEffect(() => {
    dispatch(getGameDetail(id));
    return () => dispatch(clearPage()) //cuando se desmonta, limpia el componente
  }, [id, dispatch]);

  /**
   * Ruta de detalle de videojuego: debe contener

[ ] Los campos mostrados en la ruta principal para cada videojuegos
[ ] imagen, 
[ ] nombre
[ ] géneros
[ ] Descripción
[ ] Fecha de lanzamiento
[ ] Rating
[ ] Plataformas
   */

  return (
    <React.Fragment>
      {game ? (
        <div className='game-detail' style={{
          backgroundImage: `url(${game.image_aditional || game.image})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}>
          <h1 className='position-absolute badge-title' >{game.name}</h1>
          <div className='description-container'>
            <div className='description-container-up'>

              <img className='img-detail' src={game.image} alt={game.name} />
              <div className='game-information'>
                <div className='released items-game-information'>
                  Title: {game.name}

                </div>
                <div className='released items-game-information'>
                  Release date: {game.released}

                </div>

                <div className='Rating items-game-information'>
                  Rating:

                      <div className="stars-outer">
                        <div className="stars-inner" style={{width: `${game.rating * 20}%`,
                      overflow: 'hidden'}}></div>
                      </div>
                    

                </div>

                <div className='container-genres items-game-information'>
                  Genres:
                  {game.genres.map((genre, i) => (
                    <span className='badge-pill badge-dark-light' key={genre.id}>{genre.name}</span>
                  ))}
                </div>
                <div className='container-platforms items-game-information'>
                  Platforms:
                  {game.platforms.map((p, i) =>
                    <span className='badge-pill badge-dark-light'
                      key={i || p.platform?.id}>
                      {p.platform?.name || p}
                    </span>
                  )}
                </div>

              </div>
            </div>

            <div className='description-container-down'>
              <div className='description'>
                Description: <p></p>
                {parse(game.description)}
              </div>

            </div>
          </div>

        </div>

      ) : game === undefined ? (
        <div>Cargando...</div>
      ) : (
        <h1>Juego inexistente</h1>
      )}
    </React.Fragment>
  )
}

export default Game;