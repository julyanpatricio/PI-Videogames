import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGames } from "../actions";
import { Link } from 'react-router-dom'




function Games() {
  const games = useSelector((state) => state.games);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGames());
  }, [dispatch]);

  return (
      <>
    <h3>Games</h3>
    <hr />
    <ul className="list-unstyled">
      {games.map((game) => (
        <React.Fragment key={game.id}>
          
        <Link to={game.id.toString()}>
          <h3>{game.name}</h3>
          </Link>
          
          <h4>Genres</h4>
          {game.genres.map((genre,i) => (
            <p key={genre.games_count || i}>{genre.name}</p>
          ))}
          <p>{game.image}</p>
          <img width={420} height={300} src={game.image} alt={game.name} />
        </React.Fragment>
      ))}
    </ul>
  </>
  )
}

export default Games;