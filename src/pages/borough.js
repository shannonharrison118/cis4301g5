import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import {Navbar} from '../components/navbar.js';


function Borough() {
  return (
    <div className="App">
      <Navbar />
      <p>graphs and analysis related to borough specific trends in traffic</p>
      <p>queries 3 and 4 for examples</p>
    </div>
  );
}

export default Borough;