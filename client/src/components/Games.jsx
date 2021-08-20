import React from "react";
import MostrarBotonOrd from "./BotonesOrdenamiento";
import MostrarBotonFilt from "./botonesFiltrado";
import Pagination from "./pagination";
import GamesList from "./GamesList";
import { useSelector } from "react-redux";
import './Games.css'
import backgroundDefault from '../backgroundDefault.jpg'
import gif from '../WMDx.gif'



function Games() {
  const { games, startIndex, endIndex } = useSelector((state) => state);


  return (
    <React.Fragment>

      <div className='background-games' style={{
        backgroundImage: `linear-gradient(rgba(52,58,64,1) 0%, rgba(52,58,64,0) 30%), url(${(games && games[Math.floor(Math.random() * (endIndex - startIndex) + startIndex)]?.wallpaper) || backgroundDefault})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>
        <div className='background-games' style={{
          background: 'linear-gradient(rgb(52 58 64 / 50%) 50%, rgb(52 58 64 / 50%) 40%)'
        }}>
          {games ? (
            <>
              <div className='buttons-functions'>
                <MostrarBotonFilt />
                <MostrarBotonOrd />
              </div>
              <hr style={{ mixBlendMode: 'soft-light' }} />

              <Pagination />
              <GamesList />
            </>
          ) : games === undefined ? (
            <div>
              <img src={gif} alt='spinner de carga' />
            </div>
          ) : (
            <h1>Inexist Game</h1>
          )}
        </div>
      </div>
    </React.Fragment>
  )
}

export default Games;