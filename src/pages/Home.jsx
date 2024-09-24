import React, { useState } from 'react';
import StatusBar from '../components/StatusBar';
import ParaibaMap from '../components/ParaibaMap';
import DashBar from '../components/DashBar';
import StationDetails from '../components/StationDetails';
import Theme from '../components/ToggleButton';
import { Select } from 'antd';

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

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Função que alterna o tema ao clicar em <Theme />
  const switchTheme = () => {
    // Alterna o estado de isDarkTheme
    setIsDarkTheme(prevTheme => !prevTheme);

    // Altera o atributo 'data-theme' do body com base no estado atual
    if (!isDarkTheme) {
      document.querySelector('body').setAttribute('data-theme', 'dark');
    } else {
      document.querySelector('body').setAttribute('data-theme', 'light');
    }
  }

  return (
    <div className="container" style={{ display: 'flex', height: '100vh', width: '100%' }}>
      <DashBar />
      <StatusBar />
      {/* <div onClick={switchTheme}>
        <Theme />
      </div> */}
      
      <div className="map-container" style={{ flexGrow: 1, position: 'relative', marginLeft: '310px', marginRight: '5px', backgroundColor: '#0d0d0d' }}>
        
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
            label: station.name,
          }))}
        />
        <StationDetails details={stationDetails} />
      </div>
    </div>
  );
};

export default Home;
