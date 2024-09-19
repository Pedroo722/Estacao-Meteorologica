import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import BrasilMap from '../components/BrasilMap';
import DashBar from '../components/DashBarOld';
import DashInfo from '../components/DashInfo';

const OldHome = () => {
  const [selectedState, setSelectedState] = useState(null);
  const [states] = useState([
    { id: 'AC', name: 'Acre' },
    { id: 'AL', name: 'Alagoas' },
    { id: 'AM', name: 'Amazonas' },
    { id: 'AP', name: 'Amapá' },
    { id: 'BA', name: 'Bahia' },
    { id: 'CE', name: 'Ceará' },
    { id: 'DF', name: 'Distrito Federal' },
    { id: 'ES', name: 'Espírito Santo' },
    { id: 'GO', name: 'Goiás' },
    { id: 'MA', name: 'Maranhão' },
    { id: 'MG', name: 'Minas Gerais' },
    { id: 'MS', name: 'Mato Grosso do Sul' },
    { id: 'MT', name: 'Mato Grosso' },
    { id: 'PA', name: 'Pará' },
    { id: 'PB', name: 'Paraíba' },
    { id: 'PE', name: 'Pernambuco' },
    { id: 'PI', name: 'Piauí' },
    { id: 'PR', name: 'Paraná' },
    { id: 'RJ', name: 'Rio de Janeiro' },
    { id: 'RN', name: 'Rio Grande do Norte' },
    { id: 'RO', name: 'Rondônia' },
    { id: 'RR', name: 'Roraima' },
    { id: 'RS', name: 'Rio Grande do Sul' },
    { id: 'SC', name: 'Santa Catarina' },
    { id: 'SE', name: 'Sergipe' },
    { id: 'SP', name: 'São Paulo' },
    { id: 'TO', name: 'Tocantins' },
  ]);
  

  const [stations, setStations] = useState([]);
  const [filteredStations, setFilteredStations] = useState([]);

  useEffect(() => {
    Papa.parse('/data/CatalogoEstacoesAutomaticas.csv', {
      download: true,
      header: true,
      delimiter: ';',
      complete: (result) => {
        console.log('Parsed Data:', result.data);
        const stations = result.data.map((station) => ({
          city: station.DC_NOME,
          code: station.CD_ESTACAO,
          state: station.SG_ESTADO,  
        }));
        console.log('Stations:', stations);
        setStations(stations);
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
      },
    });
  }, []);

  useEffect(() => {
    if (selectedState) {
      const filtered = stations.filter((station) => station.state === selectedState);
      setFilteredStations(filtered);
    } else {
      setFilteredStations([]);
    }
  }, [selectedState, stations]);

  const handleStateClick = (state) => {
    setSelectedState(state.id);
  };

  const handleStateSelect = (stateId) => {
    const selectedState = states.find((state) => state.id === stateId);
    if (selectedState) {
      setSelectedState(selectedState.id);
    }
  };

  return (
    <div className="container" style={{ display: 'flex', height: '100vh', width: '100%' }}>
      <DashBar 
        states={states} 
        onSelectState={handleStateSelect} 
        selectedState={selectedState}
        stations={filteredStations} 
      />
      <div className="map-container" style={{ flexGrow: 1, position: 'relative', marginLeft: '50px', marginRight: '50px' }}>
        <BrasilMap onStateClick={handleStateClick} selectedStateId={selectedState} />
      </div>
      {selectedState && (
        <DashInfo 
          id={selectedState}
          name={states.find((state) => state.id === selectedState)?.name} 
        />
      )}
    </div>
  );
};

export default OldHome;