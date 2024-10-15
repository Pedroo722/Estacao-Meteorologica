import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const DashBar = ({ states, onSelectState, selectedState, stations }) => {
  const navigate = useNavigate();
  const [selectedStation, setSelectedStation] = React.useState('');

  const handleViewStation = () => {
    if (selectedStation) {
      navigate(`/stations/${selectedStation}`);
    } else {
      alert('Selecione uma estação para visualizar.');
    }
  };

  return (
    <aside style={{
      width: '300px',
      backgroundColor: '#f0f0f0',
      padding: '20px',
      borderRight: '1px solid #ccc'
    }}>
      <h2>Dashboard</h2>
      <div className="dashbar_selector" style={{ marginBottom: '20px' }}>
        <label htmlFor="state-select">Estado</label>
        <select 
          id="state-select" 
          style={{ width: '100%', padding: '8px', marginTop: '8px' }}
          onChange={(e) => onSelectState(e.target.value)}
          value={selectedState}
        >
          <option value="">Selecione um estado</option>
          {states.map((state) => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </select>
      </div>
      <div className="dashbar_selector">
        <label htmlFor="station-select">Estação</label>
        <select 
          id="station-select" 
          style={{ width: '100%', padding: '8px', marginTop: '8px' }}
          onChange={(e) => setSelectedStation(e.target.value)}
          value={selectedStation}
        >
          <option value="">Selecione uma estação</option>
          {stations.map((station) => (
            <option key={station.code} value={station.code}>
              {station.city} ({station.code})
            </option>
          ))}
        </select>
      </div>
      <div className="dashbar_button">
        <Button 
          type="primary" 
          style={{ width: '100%', padding: '8px', marginTop: '30px' }}
          onClick={handleViewStation}
        >
          Visualizar a Estação
        </Button>
      </div>
    </aside>
  );
};

export default DashBar;