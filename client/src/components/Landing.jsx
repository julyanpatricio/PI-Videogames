import React from "react";
import { useDispatch } from "react-redux";
import { getGames, getGenres } from "../actions";
import { Link } from 'react-router-dom'
import LandingPage from '../landingPage.jpg'

function Nav() {
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(getGames())
    dispatch(getGenres())
    }

  return (
    <div>
      <button className='button' onClick={handleSubmit}>
      <Link to="/games">GAMES</Link>
      </button>
      <img src={LandingPage} alt="landing page" />
    </div>
  );
}

export default Nav;
