import React, { useState } from 'react';
import StatusBar from '../components/StatusBar';
import ParaibaMap from '../components/ParaibaMap';
import DashBar from '../components/DashBar';
import StationDetails from '../components/StationDetails';
import Map from  '../components/Map';

import { Select } from 'antd';

const Home = () => {
  const [selectedStation, setSelectedStation] = useState(null);
  const [stations] = useState([
    { id: 'A310', name: 'Areia', latitude: -7.117, longitude: -35.7 },
    { id: 'A348', name: 'Cabaceiras', latitude: -7.4836, longitude: -36.2842 },
    { id: 'A352', name: 'Camaratuba', latitude: -6.6167, longitude: -35.2667 },
    { id: 'A313', name: 'Campina Grande', latitude: -7.23056, longitude: -35.8811 },
    { id: 'A373', name: 'Itaporanga', latitude: -7.30222, longitude: -38.1506 },
    { id: 'A320', name: 'João Pessoa', latitude: -7.11532, longitude: -34.861 },
    { id: 'A334', name: 'Monteiro', latitude: -7.88333, longitude: -37.125 },
    { id: 'A321', name: 'Patos', latitude: -7.01784, longitude: -37.2747 },
    { id: 'A333', name: 'São Gonçalo', latitude: -6.75611, longitude: -38.2294 }
  ]);

  // Dados de exemplo
  const [stationDetails, setStationDetails] = useState({
    city: "Campina Grande",
    state: "PB",
    creationDate: "01/01/2000",
    code: "A313",
    latitude: "-23.5505",
    longitude: "-46.6333",
  });


  const handleSelectChange = (value) => {
    const selected = stations.find(station => station.id === value);
    if (selected) {
      setStationDetails(prevDetails => ({
        ...prevDetails,
        city: selected.name,
        code: selected.id,
      }));
      setSelectedStation(selected);
    }
  };

  return (
    <div className="container" style={{ display: 'flex', height: '100vh', width: '100%' }}>
      
      <DashBar />
      <StatusBar />      
      <div className="map-container" style={{ flexGrow: 1, position: 'relative', marginRight: '5px', backgroundColor: '#042222', borderRadius: '20px'}}>
        <ParaibaMap selectedStation={selectedStation} setSelectedStation={setSelectedStation} />
        {/* <Map selectedStation={selectedStation} /> */}
        <Map 
          selectedStation={selectedStation} 
          stations={stations} // Passa a lista de todas as estações para o mapa
        />
      </div>

      
      
      <div className="details-section">
        <Select
          showSearch
          style={{ width: 200, marginBottom: '20px' }}
          placeholder="Digite para pesquisar"
          optionFilterProp="label"
          onChange={handleSelectChange}
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
          }
          options={stations.map(station => ({
            value: station.id,
            label: station.name,
          }))}
        />
        <StationDetails details={stationDetails} />
      </div>
    </div>
  );
};

export default Home;




