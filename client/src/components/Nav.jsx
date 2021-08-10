import React from "react";
import { Link } from "react-router-dom";
import Logo from '../logoHenry.png'

import './Nav.css';

function Nav() {
  return (
    <header className="navbar">
                <Link className="navbar-brand" to="/">
                    <img id="logoHenry" src={Logo} width="30" height="30" className="d-inline-block align-top" alt="" />
                </Link> 
                <h1>Videogames</h1>
            <nav>
                <ul className="list">
                    <li className="list-item">
                    <Link to="/game/add">ADD GAME</Link>
                    <Link to="/games">GAMES</Link>
                    </li>
                </ul>
            </nav>
        </header>
  );
}

export default Nav;
