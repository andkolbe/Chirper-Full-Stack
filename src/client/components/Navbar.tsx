import * as React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="nav justify-content-center p-3 mb-2 shadow bg-secondary">
            <NavLink className="btn mx-3 py-2 font-weight-bold text-white text-uppercase" to="/">Home</NavLink>
            <NavLink className="btn mx-3 py-2 font-weight-bold text-white text-uppercase" to="/chirp/add">New Chirp</NavLink>
        </nav>
    );
}

export default NavBar;