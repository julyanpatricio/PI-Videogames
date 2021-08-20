import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearPage, getGameDetail } from "../actions";
import parse from 'html-react-parser'
import './Game.css'
import gif from '../WMDx.gif'


function Game() {
  const game = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const { id } = useParams();

  // cuando se monta la pagina hace el get
  useEffect(() => {
    dispatch(getGameDetail(id));
    return () => dispatch(clearPage()) //cuando se desmonta, limpia el componente
  }, [id, dispatch]);


  return (
    <React.Fragment>
      {game ? (
        <div className='background-game-detail' style={{
          backgroundImage: `url(${game.image_aditional || game.image})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}>
          <div className='game-detail background-games' style={{
            background: 'linear-gradient(rgb(53 58 64) 0%, rgb(52 58 64 / 20%) 30%)'
          }}>
            
            <div className='description-container'>
            <h1 className='badge-title' >{game.name}</h1>
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
                      <div className="stars-inner" style={{
                        width: `${game.rating * 20}%`,
                        overflow: 'hidden'
                      }}></div>
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
                        key={p.platform?.id || i}>
                        {p.platform?.name || p}
                      </span>
                    )}
                  </div>

                </div>
              </div>

              <div className='description-container-down'>
                <div className='description'>
                  Description: <p></p>
                  {parse(game.description.replaceAll('<br />', '<br /><br />'))}
                </div>

              </div>
            </div>

          </div>

        </div>
      ) : game === undefined ? (
        <div style={{
          marginBlock:'12%'
        }}>
          <img src={gif} alt='spinner de carga' />
        </div>
      ) : (
        <h1>Inexist Game</h1>
      )}
    </React.Fragment>
  )
}

export default Game;