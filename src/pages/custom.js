import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';


function Custom() {
  return (
    <div className="Custom">
      <p>users edit variables on this page i.e. dates to include in data, what neighborhood users are interested in, etc. </p>
      <Link to="/graph"><button className="button" class="button">save</button></Link>
    </div>
  );
}

export default Custom;
