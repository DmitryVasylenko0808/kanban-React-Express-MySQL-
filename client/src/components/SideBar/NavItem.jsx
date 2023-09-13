import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({ to, title }) => {
    return (
        <li className="sidebar-nav__item">
            <NavLink className="sidebar-nav__link" to={`${to}`}>
                <img src="./assets/dark/table-list-solid.svg" alt="board" />
                {title}
            </NavLink>
        </li>
    );
}

export default NavItem;