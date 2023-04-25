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

  const labels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Average number of cars',
        data: mostBusy.map((data) => data.avg_cars),
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
        text: 'Average Number of Cars vs. Time of day (Hr)',
      },
    },
    scales: {
      y: 
      {
        type: 'linear',
        display: true,
        position: 'left'
        [{
        // 
          scaleLabel: {
            display: true,
            labelString: 'Average Number of Cars'
          }
        }]
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
        <p>View the busiest times of day for a given borough.</p>
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
        <button type="submit">View Busiest Hours </button>
      </form>
      <h2>Average Count by Hour in {borough}:</h2>
      <ul>
        {mostBusy.map((data, index) => (
          <li key={index}>
            {data.borough}, hour (in 24): {data.hour}, average num of cars: {data.avg_cars}
          </li>
        ))}
      </ul>
      {Object.keys(chartData).length > 0 && <Line data={chartData} options={chartOptions} />}
    </div>
  );
}

export default Query4;