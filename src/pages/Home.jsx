import React, { useState } from 'react';
import ParaibaMap from '../components/ParaibaMap';
import DashBar from '../components/DashBar'; 
import StationDetails from '../components/StationDetails';

const Home = () => {
  const [selectedStation, setSelectedStation] = useState(null);
  const [stations] = useState([
    { id: 'A310', name: 'Areia' },
    { id: 'A348', name: 'Cabaceiras' },
    { id: 'A352', name: 'Camaratuba' },
    { id: 'A313', name: 'Campina Grande' },
    { id: 'A373', name: 'Itaporanga' },
    { id: 'A320', name: 'João Pessoa' },
    { id: 'A334', name: 'Monteiro' },
    { id: 'A321', name: 'Patos' },
    { id: 'A333', name: 'São Gonçalo' }
  ]);

  // Dados de exemplo
  const stationDetails = {
    city: "Campina Grande",
    state: "PB",
    creationDate: "01/01/2000",
    code: "A313",
    latitude: "-23.5505",
    longitude: "-46.6333",
  };

  return (
    <div className="container" style={{ display: 'flex', height: '100vh', width: '100%' }}>
        <DashBar />
        <div className="map-container" style={{ flexGrow: 1, position: 'relative', marginLeft: '310px', marginRight: '5px', backgroundColor: '#0d0d0d' }}>
          <ParaibaMap selectedStation={selectedStation} setSelectedStation={setSelectedStation} />
        </div>
        <StationDetails details={stationDetails} />
    </div>
  );
};

export default Home;
