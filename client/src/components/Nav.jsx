import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from '../logoHenry.png'
import LogoGame from '../logo-game.png'

import './Nav.css';
import { useSelector } from "react-redux";
import Search from "./Search";



function Nav() {
    const urlPatch = useLocation().pathname
    const { games } = useSelector(state => state)
    

    function getBackground() {
        return games.length ? `linear-gradient(0deg, rgba(52,58,64,1) 0%, rgba(52,58,64,0) 100%), url(${games[Math.floor(Math.random() * (games.length))].image}` : 'url(data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==)'
    }

    return (
        <>
            <header className="navbar" style={{
                backgroundImage: getBackground(),
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }}>
                <Link className="navbar-brand" to="/">
                    <img id="logo" src={LogoGame} className="d-inline-block align-top" alt="" />
                </Link>
                {/* <h1>Videogames</h1> */}
                <nav>
                    <ul className="list">
                        <li className="list-item">
                            {urlPatch === '/games' ? <Search /> : null}
                            <Link to="/game/add">ADD GAME</Link>
                            <Link to="/games">GAMES</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
}

export default Nav;
