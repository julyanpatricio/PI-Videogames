import React from "react";
import './Games.css'
import MostrarBotonOrd from "./BotonesOrdenamiento";
import MostrarBotonFilt from "./botonesFiltrado";
import Pagination from "./pagination";
import GamesList from "./GamesList";
import Search from "./Search";
import { useSelector } from "react-redux";



function Games() {
  const { games, startIndex, endIndex } = useSelector((state) => state);


  return (
    <>

      {/* <Search /> */}
      <div style={{
        backgroundImage: `linear-gradient(0deg, rgba(52,58,64,1) 0%, rgba(52,58,64,0) 100%), url(${games[startIndex]?.wallpaper})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>
        <div style={{
          background:'#000000ba'
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
    </>
  )
}

export default Games;