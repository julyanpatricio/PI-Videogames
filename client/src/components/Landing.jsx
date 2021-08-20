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

      <button type='button' className='button-landing  position-absolute' onClick={handleSubmit}>
        <Link to="/games">
          Enter the site
        </Link>
      </button>

      <img className='img-landing' src={LandingPage} alt="landing page" />
    </div>
  );
}

export default Landing;
