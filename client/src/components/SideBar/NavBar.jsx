import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ children }) => {
    return (
        <nav className="sidebar-nav">
            <ul className="sidebar-nav__list">
                {children}
            </ul>
        </nav>
    );
}

export default NavBar;