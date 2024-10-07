import React, { useState } from 'react';
import StatusBar from '../components/StatusBar';
import ParaibaMap from '../components/ParaibaMap';
import DashBar from '../components/DashBar';
import StationDetails from '../components/StationDetails';
import { baseUrlStationDetails } from '../util/constants';
import { Select } from 'antd';
import axios from 'axios';

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

  const [stationDetails, setStationDetails] = useState({
    city: '',
    state: '',
    creationDate: '',
    code: '',
    latitude: '',
    longitude: ''
  });

  const handleSelectChange = async (value) => {
    const selected = stations.find(station => station.id === value);
    if (selected) {
      setSelectedStation(selected);

      setStationDetails(prevDetails => ({
        ...prevDetails,
        city: selected.name,
        code: selected.id    
      }));

      try {
        const response = await axios.get(baseUrlStationDetails + `${selected.id}`);
        const { estado, latitude, longitude, dataFundacao } = response.data;

        setStationDetails(prevDetails => ({
          ...prevDetails,
          state: estado,
          creationDate: dataFundacao,
          latitude: parseFloat(latitude).toFixed(2),
          longitude: parseFloat(longitude).toFixed(2)
        }));
      } catch (error) {
        console.error('Error fetching station details:', error);
      }
    }
  };

  return (
    <div className="container" style={{ display: 'flex', height: '100vh', width: '100%' }}>
      <DashBar />
      <StatusBar />
      <div className="map-container" style={{ flexGrow: 1, position: 'relative', marginRight: '5px', backgroundColor: '#042222', borderRadius: '20px' }}>
        <ParaibaMap selectedStation={selectedStation} setSelectedStation={setSelectedStation} />
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
            label: station.name
          }))}
        />
        <StationDetails details={stationDetails} />
      </div>
    </div>
  );
};

export default Home;
