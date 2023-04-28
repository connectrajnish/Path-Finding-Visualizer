import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
// import About from './About'

function Navbar({ children }) {
    return (
        <nav className="navbar">
            <ul className="nav-links">
                <div className="left">
                    <li><a href="/">Home</a></li>
                    {/* <li><a href="/about">About</a></li> */}
                    <li><Link to={`About`}>Explanation</Link> </li>
                    <li><Link to={`Developers`}>Developers</Link> </li>
                </div>
                <li className="nav-button">{children}</li>
            </ul>
        </nav>
    );
}

export default Navbar;
