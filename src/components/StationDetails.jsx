import React from 'react';

const StationDetails = ({ details }) => {
  return (
    <div>
      <h2>Detalhes da Estação</h2>
      <p><strong>Cidade:</strong> {details.city}</p>
      <p><strong>Estado:</strong> {details.state}</p>
      <p><strong>Data de Criação:</strong> {details.creationDate}</p>
      <p><strong>Código (WMO):</strong> {details.code}</p>
      <p><strong>Latitude:</strong> {details.latitude}</p>
      <p><strong>Longitude:</strong> {details.longitude}</p>
    </div>
  );
};

export default StationDetails;
