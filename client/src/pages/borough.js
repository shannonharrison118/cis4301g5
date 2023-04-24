import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {Navbar} from '../components/navbar.js';
import { Line } from 'react-chartjs-2';
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

  let chartData = {};
  let chartOptions = {};

  if (mostDanger.length > 0) {
    chartData = {
      labels: mostDanger.map((data) => data.onStreet),
      datasets: [
        {
          label: 'Number of Collisions',
          data: mostDanger.map((data) => data.num_collisions),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
        {
          label: 'Average Volume',
          data: mostDanger.map((data) => data.avg_volume),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };

    chartOptions = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };
  }

  return (
    <div className="App">
      <div>
        <Navbar />
        <p>graphs and analysis related to borough specific trends in traffic</p>
        <p>query 3</p>
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
      {mostDanger.size > 0 ? (
        <Line data={chartData} options={chartOptions} />
      ) : null}
    </div>
  );
}

export default Query3;