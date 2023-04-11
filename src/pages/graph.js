import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';


function Graph() {
  return (
    <div className="App">
      <p>this page shows the graph and offers users to further customize variables</p>
      <Link to="/customize"><button className="button" class="button">Customize Data</button></Link>
      <p>will make a footer or header element to go back to home page</p>
      <Link to="/"><button className="button" class="button">home</button></Link>
    </div>
  );
}

export default Graph;