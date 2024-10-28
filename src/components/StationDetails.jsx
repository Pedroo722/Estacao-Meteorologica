import React from 'react';
import '../styles/StationDetails.css';


const StationDetails = ({ details, isMinimized }) => {
  return (
    <div className={`details-container ${isMinimized ? 'details-container-minimized' : 'details-container-expanded'}`}>
      <h1 className="details-title">Detalhes da Estação {details.code}</h1>
      <div className="details-grid">
        <div className="details-item"><strong>Cidade:</strong> {details.city}</div>
        <div className="details-item"><strong>Código (WMO):</strong> {details.code}</div>
        
        <div className="details-item"><strong>Estado:</strong> {details.uf}</div>
        <div className="details-item"><strong>Latitude:</strong> {details.latitude}</div>
        
        <div className="details-item"><strong>Data de Criação:</strong> {details.creationDate}</div>
        <div className="details-item"><strong>Longitude:</strong> {details.longitude}</div>
      </div>
    </div>
  );
};

export default StationDetails;
