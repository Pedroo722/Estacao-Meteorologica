import React from 'react';
import BrasilMap from '../components/BrasilMap';

const Home = () => {
  return (
    <div className="container">
      <h1 className="title">Mapa Brasileiro</h1>
      <div className="map-container">
        <BrasilMap />
      </div>
    </div>
  );
};

export default Home;
