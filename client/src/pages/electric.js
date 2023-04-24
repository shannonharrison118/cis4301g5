import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {Navbar} from '../components/navbar.js';
import axios from 'axios';
import '../App.css';

function Query5() {
  //const [borough, setBorough] = useState('');
  const [taxElectric, setTaxElectric] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.get('http://localhost:5000/query5',
        );
        setTaxElectric(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <div>
        <Navbar />
        <p>graphs and analysis related to electric cars</p>
        <p>query 5</p>
      </div>
      <form onSubmit={handleSubmit}>
        
        <button type="submit">See trends</button>
      </form>
      <h2>Tax Data and Electric Cars</h2>
      <ul>
        {taxElectric.map((data, index) => (
          <li key={index}>
            {data.year}, {data.registrations}, {data.total_volume}, {data.mediangrossincome}, {data.avg_montly_collisions}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Query5;