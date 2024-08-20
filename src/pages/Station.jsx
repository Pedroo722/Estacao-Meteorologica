import React from 'react';
import StationDetails from '../components/StationDetails'; 

const Station = () => {
  // Dados de teste
  const stationDetails = {
    city: "São Paulo",
    state: "SP",
    creationDate: "01/01/2000",
    code: "SP001",
    latitude: "-23.5505",
    longitude: "-46.6333",
  };

  return (
    <div>
      <h1>Detalhes da Estação {stationDetails.code}</h1>
      <StationDetails details={stationDetails} />
    </div>
  );
};

export default Station;
