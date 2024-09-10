import React, { useState } from 'react';
import ParaibaMap from '../components/ParaibaMap';
import DashBar from '../components/DashBar'; 

const Home = () => {
  const [selectedStation, setSelectedStation] = useState(null);
  const [stations] = useState([
    { id: 'A310', name: 'Areia' },
    { id: 'A348', name: 'Cabaceiras' },
    { id: 'A352', name: 'Camatuba' },
    { id: 'A313', name: 'Campina Grande' },
    { id: 'A373', name: 'Itaporanga' },
    { id: 'A320', name: 'João Pessoa' },
    { id: 'A334', name: 'Monteiro' },
    { id: 'A321', name: 'Patos' },
    { id: 'A333', name: 'São Gonçalo' }
  ]);

  return (
    <div className="container" style={{ display: 'flex', height: '100vh', width: '100%' }}>
        <DashBar />
        <div className="map-container" style={{ flexGrow: 1, position: 'relative', marginLeft: '310px', marginRight: '5px' }}>
            <ParaibaMap />
        </div>
    </div>
  );
};

export default Home;
