import './navbar.css';
import React from 'react';
import { Link } from 'react-router-dom';


export const Navbar = () => {
  return(
    <div id="nav">
        <Link id="navlink" to="/">home</Link>
        <Link id="navlink" to="/borough">Borough Data</Link>
        <Link id="navlink" to="/closure">Closures and Construction</Link>
        <Link id="navlink" to="/electric">Electric Cars</Link>
        <Link id="navlink" to="/custom">Custom Search</Link>
    </div>
  );
};

