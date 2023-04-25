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

  /* let chartData = [];
  let chartOptions = [];
 */
  //if (mostDanger.length > 0) {
    const labels = ['2018', '2019', '2020'];
    const chartData = {
      labels,
      datasets: [
        {
          label: 'Number of Collisions',
          data: mostDanger.map((data) => data.num_collisions),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
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
  //}

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
      {Object.keys(chartData).length > 0 && <Line data={chartData} options={chartOptions} />}

{/*       console.log(chartData.datasets[0].data);
 */}
      {/* <Line data={console.log(chartData.datasets[0].data)} options={chartOptions} />   */}
      {/* {chartData.datasets[0].data ? (
        <Line data={(chartData.datasets[0].data)} options={chartOptions} />
      ) : null} */}
    </div>
  );
}

export default Query3;