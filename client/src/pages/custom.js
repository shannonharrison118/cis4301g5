import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import {Navbar} from '../components/navbar.js';


function Custom() {
  return (
    <div className="App">
        <Navbar />
        <p>users edit any combination of variables on this page i.e. dates to include in data, what neighborhood users are interested in, etc. </p>
        <p>database loads corresponding query below</p>
    </div>
  );
}

export default Custom;
