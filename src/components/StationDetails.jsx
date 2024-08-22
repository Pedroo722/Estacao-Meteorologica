import React from 'react';

const StationDetails = ({ details }) => {
  return (
    <div className="details-container">
      <h1 className="details-title">Detalhes da Estação {details.code}</h1>
      <div className="details-columns">
        <div className="details-column">
          <p><strong>Cidade:</strong> {details.city}</p>
          <p><strong>Estado:</strong> {details.state}</p>
          <p><strong>Data de Criação:</strong> {details.creationDate}</p>
        </div>
        <div className="details-column">
          <p><strong>Código (WMO):</strong> {details.code}</p>
          <p><strong>Latitude:</strong> {details.latitude}</p>
          <p><strong>Longitude:</strong> {details.longitude}</p>
        </div>
      </div>
    </div>
  );
};

export default StationDetails;
