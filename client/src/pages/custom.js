import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {Navbar} from '../components/navbar.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
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

  //const labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    const chartData = {
      //labels,
      datasets: [
        {
          data: avgTraffic.map((data) => ({x: data.day, y: data.avg_traffic})),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          xAxisID: "x",
          yAxisID: "y"
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Line Chart',
        },
      },
      scales: {
        x: {
          type: 'linear',
          display: true,
          position: 'left',
          max: 31,
          min: 1,
          ticks: {
            stepSize: 1
          }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left'
        },
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          autoPadding: true
        }
      }
    };

    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend
    );

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
      {Object.keys(chartData).length > 0 && <Line data={chartData} options={chartOptions} />}

    </div>
  );
}

export default Query1;