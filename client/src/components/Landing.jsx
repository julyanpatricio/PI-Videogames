import React from "react";
import { useDispatch } from "react-redux";
import { getGames, getGenres } from "../actions";
import { Link } from 'react-router-dom'
import LandingPage from '../landingPage.jpg'
import './Landing.css'

function Landing() {
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(getGames())
    dispatch(getGenres())
    }

  return (
    <div className='landing'>
      <button className='button' onClick={handleSubmit}>
      <Link to="/games">GAMES</Link>
      </button>
      <img src={LandingPage} width={`${100}%`} height={`${100}%`}  alt="landing page" />
    </div>
  );
}

export default Landing;
