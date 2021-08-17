import React from "react";
import { Link, useLocation } from "react-router-dom";
import bannerGamer from '../bannerGamer.jpg'
import logoJoystick from '../logo-joystick.png'
// import { useSelector } from "react-redux";
import Search from "./Search";
import './Nav.css';


function Nav() {
    const urlPatch = useLocation().pathname
    // const { games } = useSelector(state => state)
    
    // function getBackground() {
    //     return games.length ? `linear-gradient(0deg, rgba(52,58,64,1) 0%, rgba(52,58,64,0) 100%), url(${games[Math.floor(Math.random() * (games.length))].image}` : `linear-gradient(0deg, rgba(52,58,64,1) 0%, rgba(52,58,64,0) 100%), url(${bannerGamer})`
    // }
    
    return (
        urlPatch !== '/' ?
            <div className="navbar" style={{
                // backgroundImage: getBackground(),
                backgroundImage: `linear-gradient(0deg, rgba(52,58,64,1) 0%, rgba(52,58,64,0) 100%), url(${bannerGamer})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }}>
                <Link className="navbar-brand" to="/">
                    <img id="logo" src={logoJoystick} height={190} className="d-inline-block align-top" alt="" />
                </Link>
                <nav>
                    <ul className="list">
                        <div>
                        <li className="list-item">
                            <Link to="/game/add">Add game</Link>
                        </li>
                        <li className="list-item">
                            <Link to="/games">Games</Link>
                        </li>
                        </div>
                        <li className="list-item">
                            {urlPatch === '/games' ? <Search /> : null}
                        </li>
                    </ul>
                </nav>
            </div>
        : null
    );
}

export default Nav;
