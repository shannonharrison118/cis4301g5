import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {Navbar} from '../components/navbar.js';
import axios from 'axios';
import '../App.css';

function Query4() {
  const [borough, setBorough] = useState('');
  const [mostBusy, setMostBusy] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.get('http://localhost:5000/query4',
        {params: { borough }}
        );
        setMostBusy(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <div>
        <Navbar />
        <p>graphs and analysis related to borough specific trends in traffic</p>
        <p>query 4</p>
      </div>
      <form onSubmit={handleSubmit}>
        {<label>
          Select Borough:
          <input
            type="text"
            value={borough}
            onChange={(event) => setBorough(event.target.value)}
          />
        </label>} 
        <button type="submit">Get Most Busy Streets</button>
      </form>
      <h2>Most Busy Streets in Each Borough:</h2>
      <ul>
        {mostBusy.map((data, index) => (
          <li key={index}>
            {data.borough}, hour (in 24):{data.hour}, average num of cars:{data.avg_cars}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Query4;