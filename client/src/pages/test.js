import React, { useState } from 'react';
import axios from 'axios';

function TrafficVolume() {
  const [streetName, setStreetName] = useState('');
  const [trafficVolumeData, setTrafficVolumeData] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.get('http://localhost:5000/trafficVolCount', {
            params: { streetName },
          } );
      setTrafficVolumeData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {<label>
          Street Name:
          <input
            type="text"
            value={streetName}
            onChange={(event) => setStreetName(event.target.value)}
          />
        </label> }
        <button type="submit">Get Traffic Volume Data</button>
      </form>
      <h2>Traffic Volume Data for {streetName}:</h2>
      <ul>
        {trafficVolumeData.map((data, index) => (
          <li key={index}>
            {data.streetName}: {data.volume}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrafficVolume;
