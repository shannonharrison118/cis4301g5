import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';


function Data() {
  return (
    <div className="Data">
      <p>insert queries for user to select from</p>
      <p>button takes u to graph page</p>
      <Link to="/graph"><button className="button" class="button">next</button></Link>
    </div>
  );
}

export default Data;