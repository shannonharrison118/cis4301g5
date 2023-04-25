import './navbar.css';
import React from 'react';
import { Link } from 'react-router-dom';


export const Navbar = () => {
  return(
    <div id="nav">
        <Link id="navlink" to="/">Home</Link>
        <Link id="navlink" to="/borough">Borough Collisions</Link>
        <Link id="navlink" to="/closure">Busy Boroughs</Link>
        <Link id="navlink" to="/electric">Electric Vehicle Use</Link>
        <Link id="navlink" to="/custom">Construction Closures</Link>
        <Link id="navlink" to="/test">Direction Changes</Link>
    </div>
  );
};

