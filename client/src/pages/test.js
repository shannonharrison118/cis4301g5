import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {Navbar} from '../components/navbar.js';
import axios from 'axios';
import '../App.css';

function Query2() {
  const [street, setStreet] = useState('');
  const [avgTraffic, setAvgTraffic] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.get('http://localhost:5000/query2', {
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
        <p>Hourly volume count of streets that have had direction changes, before and after changes</p>
        <p>query 2</p>
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
        <button type="submit">View traffic patterns before and after change</button>
      </form>
      <h2>Traffic Count on {street}:</h2>
      <ul>
        {avgTraffic.map((data, index) => (
          <li key={index}>
            {data.onStreet}: {data.newdirection}: {data.changeday}: {data.changemonth}: {data.changeyear}: 
            {data.yr}: {data.m}: {data.d}: {data.hh}: {data.sum_vol_dir}:
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Query2;