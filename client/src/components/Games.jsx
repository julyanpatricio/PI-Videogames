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
    <Pagination />
    <hr />
    <GamesList />
    
  </>
  )
}

export default Games;