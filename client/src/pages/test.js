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

  const chartData = {
    //labels,
    datasets: [
      {
        label: 'Average daily volume',
        data: avgTraffic.map((data) => ({x: data.d, y: data.sum_vol_dir})),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        xAxisID: "x",
        yAxisID: "y"
      },
      {
        label: 'Traffic Change Day',
        data: avgTraffic.map((data) => ({x: data.changeday, y: data.sum_vol_dir})),
        borderColor: 'rgb(111, 99, 132)',
        backgroundColor: 'rgba(111, 99, 132, 0.5)',
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
        /* max: 31,
        min: 1,*/
        ticks: {
          stepSize: 1
        } 
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left'
      },
      y2: {
        display: true,
        
        max: 50,
        min: 0,
        ticks: {
          stepSize: 1
        } 
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
        <p>Daily average volume count of streets that have had direction changes, before and after changes</p>
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
        <button type="submit">View Traffic Patterns</button>
      </form>
      <h2>Traffic Count on {street}:</h2>
      <ul>
        {avgTraffic.map((data, index) => (
          <li key={index}>
            {data.onStreet}: {data.newdirection}: {data.changeday}: {data.changemonth}: {data.changeyear}: 
            {data.yr}: {data.m}: {data.d}: {data.hh}: {data.sum_vol_dir}
          </li>
        ))}
      </ul>
      {Object.keys(chartData).length > 0 && <Line data={chartData} options={chartOptions} />}
    </div>
  );
}

export default Query2;