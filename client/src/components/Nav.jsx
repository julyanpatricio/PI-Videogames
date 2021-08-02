import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="navbar navbar-fixed-top navbar-inverse" role="navigation">
      <div className="container">
        <div className="navbar-header">
          {/* <button
            type="button"
            className="navbar-toggle"
            data-toggle="collapse"
            data-target="#nav-items"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button> */}
          <Link className="navbar-brand" to="/">
            Videogames
          </Link>
        </div>
        <div id="nav-items" className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li>
              <Link to="/game/add">ADD GAME</Link>
            </li>
            <li>
              <Link to="/games">GAMES</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Nav;
