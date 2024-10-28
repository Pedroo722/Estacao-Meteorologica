import React, { useState, useEffect } from 'react';
import StatusBar from '../components/StatusBar';
import StationDetails from '../components/StationDetails';
import InteractiveMap from  '../components/InteractiveMap';
import { baseUrlStationDetails } from '../util/constants';
import axios from 'axios';

const Home = ({ isMinimized }) => {
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

  const [stationDetails, setStationDetails] = useState({
    city: '',
    uf: '',
    creationDate: '',
    code: '',
    latitude: '',
    longitude: ''
  });


  useEffect(() => {
    const defaultStation = stations.find(station => station.id === 'A320'); // João Pessoa
    if (defaultStation) {
      setSelectedStation(defaultStation);
      fetchStationDetails(defaultStation); // Carregar os detalhes de João Pessoa automaticamente
    }
  }, [stations]);

  const fetchStationDetails = async (station) => {
    setSelectedStation(station);
  
    // Atualiza a cidade e código primeiro
    setStationDetails(prevDetails => ({
      ...prevDetails,
      city: station.name,
      code: station.id,
      uf: '',
      creationDate: '',
      latitude: '',
      longitude: ''
    }));
  
    try {
      const response = await axios.get(baseUrlStationDetails + `${station.id}`);
      const { uf, latitude, longitude, dataFundacao } = response.data;
  
      // Atualiza o restante das informações
      setStationDetails(prevDetails => ({
        ...prevDetails,
        uf: uf,
        creationDate: dataFundacao,
        latitude: parseFloat(latitude).toFixed(2),
        longitude: parseFloat(longitude).toFixed(2)
      }));  
    } catch (error) {
      console.error('Error fetching station details:', error);
    }
  };
  

  return (
    <div className={`container ${isMinimized ? 'minimized' : 'maximized'}`}>
    {/* // <div className="container" style={{alignItems: 'center'}}> */}

      <StatusBar selectedStationCode={selectedStation?.id} isMinimized={isMinimized} />
      
      <div className= {`map-container ${isMinimized ? 'map-container-minimized' : 'map-container-expanded'}`}>
        <InteractiveMap 
          selectedStation={selectedStation} 
          stations={stations} 
          setSelectedStation={fetchStationDetails}  // Passa o setter como prop
          isMinimized={isMinimized}
        />
      </div>

      <div className="details-section">
        <StationDetails details={stationDetails} isMinimized={isMinimized} />
      </div>
    </div>
  );
};

export default Home;
