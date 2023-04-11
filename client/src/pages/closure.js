import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import {Navbar} from '../components/navbar.js';


function Closure() {
  return (
    <div className="App">
      <Navbar />
      <p>show grpahs related to all street closures and construction reroutes</p>
      <p>queries 1 and 2 examples</p>
    </div>
  );
}

export default Closure;