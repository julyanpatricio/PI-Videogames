import React from "react";
import './Games.css'
import MostrarBotonOrd from "./BotonesOrdenamiento";
import MostrarBotonFilt from "./botonesFiltrado";
import Pagination from "./pagination";
import GamesList from "./GamesList";
import Search from "./Search";



function Games() {
  
  

  return (
    <>
        
    <Search />
    <MostrarBotonOrd />
    <MostrarBotonFilt />
    <hr />
    <Pagination />
    <GamesList />
    
  </>
  )
}

export default Games;