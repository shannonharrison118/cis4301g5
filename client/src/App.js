import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import {Navbar} from './components/navbar.js';


function App() {
  return (
    <div className="App">
      <Navbar />
      <div class="home">
        <h1>Welcome to NYC Traffic Analyzer</h1>
        <p>Project by: Audrey Weigel, Ekin Atay, Andrea Moreno, and Shannon Harrison</p>
        <small>***might need to go to a log in screen for the oracle stuff to connect***</small>
        <div class="opt">
          <Link to="/closure"><button className="button" class="button">Busy Boroughs Q4</button></Link>
          <Link to="/electric"><button className="button" class="button">Electric Vehicle Use Q5</button></Link>
          <Link to="/borough"><button className="button" class="button">Dangerous Streets Q3</button></Link>
          <Link to="/custom"><button className="button" class="button">Construction Closures Q1</button></Link>
          <Link to="/test"><button className="button" class="button">Direction Changes Q2</button></Link>
        </div>
      </div>
    </div>
  );
}

export default App;
