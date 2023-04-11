import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import {Navbar} from '../components/navbar.js';


function Electric() {
  return (
    <div className="App">
      <Navbar />
      <p>quries and analysis related to electric cars in nyc</p>
      <p>query 5 as example</p>
    </div>
  );
}

export default Electric;