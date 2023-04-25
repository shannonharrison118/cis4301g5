import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import {Navbar} from './components/navbar.js';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [totalTuples, setTotalTuples] = useState(0);
  const [mostDanger, setMostDanger] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('handleSubmit called');
    try {
        const response = await axios.get('http://localhost:5000/query6', {
            params: { totalTuples },
          } );
          console.log('Response:', response); // Add this line
          const totalTuplesFromResponse = response.data[0].total_tuples; // Update this line
          setTotalTuples(totalTuplesFromResponse);
          setMostDanger(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <Navbar />
      <div class="home">
        <h1>Welcome to NYC Traffic Analyzer!</h1>
        <p>Project by: Audrey Weigel, Ekin Atay, Andrea Moreno, and Shannon Harrison</p>
        <form onSubmit={handleSubmit}>
              <button type="submit">See Total Tuples</button>
        </form>
        <p>Total Tuples: {totalTuples}</p>
          <div class="opt">
          <Link to="/custom"><button className="button" class="button">Construction Closures Q1</button></Link>
          <Link to="/test"><button className="button" class="button">Direction Changes Q2</button></Link>
          <Link to="/borough"><button className="button" class="button">Dangerous Streets Q3</button></Link>
          <Link to="/closure"><button className="button" class="button">Busy Boroughs Q4</button></Link>
          <Link to="/electric"><button className="button" class="button">Electric Vehicle Use Q5</button></Link>
          
          
        </div>
      </div>
    </div>
  );
}

export default App;
