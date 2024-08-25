import React, { useState } from 'react';
import BrasilMap from '../components/BrasilMap';
import DashBar from '../components/DashBar';
import DashInfo from '../components/DashInfo';

const Home = () => {
  const [selectedState, setSelectedState] = useState(null);
  const [states] = useState([
    { id: 'BR_DF', name: 'Distrito Federal' },
    { id: 'BR_RN', name: 'Rio Grande do Norte' },
    //
  ]);

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
      />
      <div className="map-container" style={{ flexGrow: 1, position: 'relative', marginLeft: '50px', marginRight: '50px' }}>
        <BrasilMap onStateClick={handleStateClick} selectedStateId={selectedState} />
      </div>
      {selectedState && (
        <DashInfo 
          id={selectedState}
          name={states.find((state) => state.id === selectedState)?.name} 
          //
        />
      )}
    </div>
  );
};

export default Home;
