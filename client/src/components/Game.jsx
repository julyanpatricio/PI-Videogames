import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearPage, getGameDetail } from "../actions";
import './Game.css'


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

[ ] Los campos mostrados en la ruta principal para cada videojuegos (imagen, nombre, y géneros)
[ ] Descripción
[ ] Fecha de lanzamiento
[ ] Rating
[ ] Plataformas
   */

  return (
    <div className='game-detail'>
      {game ? (
        <>
          <h1>{game.name}</h1>
          
          {game.genres.map((genre,i) => (
            <p key={genre.games_count || i}>{genre.name}</p>
          ))}
          <img width={420} height={300} src={game.image} alt={game.name} />
        </>
      ) : game === undefined ? (
        <div>Cargando...</div>
      ) : (
        <h1>Juego inexistente</h1>
      )}
    </div>
  )
}

export default Game;