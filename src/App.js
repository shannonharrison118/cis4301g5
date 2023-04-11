import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <div class="home">
        <h1>Welcome to NYC Traffic Analyzer</h1>
        <p>Project by: Audrey Weigel, Ekin Atay, Andrea Moreno, and Shannon Harrison</p>
        <Link to="/generate"><button className="button" class="button">Generate Data</button></Link>
        <Link to="/about"><button className="button" class="button">About the Data</button></Link>
      </div>
    </div>
  );
}

export default App;
