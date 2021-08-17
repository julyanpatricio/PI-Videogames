import React from "react";
import MostrarBotonOrd from "./BotonesOrdenamiento";
import MostrarBotonFilt from "./botonesFiltrado";
import Pagination from "./pagination";
import GamesList from "./GamesList";
import { useSelector } from "react-redux";
import './Games.css'



function Games() {
  const { games, startIndex } = useSelector((state) => state);


  return (
    <React.Fragment>
      <div className='background-games' style={{
        backgroundImage: `linear-gradient(rgba(52,58,64,1) 0%, rgba(52,58,64,0) 30%), url(${games[startIndex]?.wallpaper || 'https://media.rawg.io/media/games/4e6/4e6e8e7f50c237d76f38f3c885dae3d2.jpg' })`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>
        <div className='background-games' style={{
          background: 'linear-gradient(rgb(52 58 64 / 79%) 50%, rgb(52 58 64 / 80%) 40%)'
        }}>
          <div className='buttons-functions'>
            <MostrarBotonFilt />
            <MostrarBotonOrd />
          </div>
          <hr />
          <Pagination />
          <GamesList />
        </div>
      </div>
    </React.Fragment>
  )
}

export default Games;