import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {Navbar} from '../components/navbar.js';
import axios from 'axios';
import '../App.css';

function Query3() {
  const [borough, setBorough] = useState('');
  const [mostDanger, setMostDanger] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.get('http://localhost:5000/query3', {
            params: { borough },
          } );
          setMostDanger(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <div>
        <Navbar />
        <p>graphs and analysis related to borough specific trends in traffic</p>
        <p>queries 3 and 4 for examples</p>
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
        <button type="submit">Get Most Dangerous Streets</button>
      </form>
      <h2>Most Dangerous Streets in {borough}:</h2>
      <ul>
        {mostDanger.map((data, index) => (
          <li key={index}>
            {data.borough}: {data.onStreet}: {data.year}: {data.num_collisions}: {data.avg_volume}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Query3;