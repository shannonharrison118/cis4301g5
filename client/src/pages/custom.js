import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {Navbar} from '../components/navbar.js';
import axios from 'axios';
import '../App.css';

function Query1() {
  const [street, setStreet] = useState('');
  const [avgTraffic, setAvgTraffic] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.get('http://localhost:5000/query1', {
            params: { street },
          } );
          setAvgTraffic(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <div>
        <Navbar />
        <p>graphs and analysis related to borough specific trends in traffic</p>
        <p>query 1</p>
      </div>
      <form onSubmit={handleSubmit}>
        {<label>
          Select Street:
          <input
            type="text"
            value={street}
            onChange={(event) => setStreet(event.target.value)}
          />
        </label>}
        <button type="submit">Get Average Traffic Count during work hours</button>
      </form>
      <h2>Average Traffic Count on {street}:</h2>
      <ul>
        {avgTraffic.map((data, index) => (
          <li key={index}>
            {data.street}: {data.year}: {data.month}: {data.day}: {data.avg_traffic}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Query1;