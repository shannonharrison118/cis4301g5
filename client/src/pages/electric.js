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

function Query5() {
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

  const chartData = {
    //labels,
    datasets: [
      {
        label: 'number of registrations',
        data: taxElectric.map((data) => ({x: data.year, y: data.registrations})),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        xAxisID: "x",
        yAxisID: "y"
      },
      {
        label: 'median gross income',
        data: taxElectric.map((data) => ({x: data.year, y: data.mediangrossincome})),
        borderColor: 'rgb(100, 99, 132)',
        backgroundColor: 'rgba(100, 99, 132, 0.5)',
        xAxisID: "x",
        yAxisID: "y2"
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
        min: 1,
        ticks: {
          stepSize: 1
        } */
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left'
      },
      y2: {
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
        <p>graphs and analysis related to electric cars</p>
        <p>query 5</p>
      </div>
      <form onSubmit={handleSubmit}>
        
        <button type="submit">See trends</button>
      </form>
      <h2>Median Income and Electric Cars</h2>
      <ul>
        {taxElectric.map((data, index) => (
          <li key={index}>
            {data.year}, {data.registrations}, {data.total_volume}, {data.mediangrossincome}, {data.avg_montly_collisions}
          </li>
        ))}
      </ul>
      {Object.keys(chartData).length > 0 && <Line data={chartData} options={chartOptions} />}

    </div>
  );
}

export default Query5;