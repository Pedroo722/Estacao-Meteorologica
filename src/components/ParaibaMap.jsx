import React, { useState } from 'react';
import { ReactComponent as ParaibaSVG } from '../data/ParaibaMap.svg';

const ParaibaMap = ({ selectedStation }) => {
  const stationInfo = selectedStation ? (
    <div style={{ 
      backgroundColor: '#2a6e4b',
      color: '#fff',
      padding: '10px',
      borderRadius: '8px',
      position: 'absolute',
      bottom: '20px',
      right: '20px',
      fontSize: '16px'
    }}>
      <h4>{selectedStation.name} ({selectedStation.id})</h4>
      <p><strong>Cidade:</strong> {selectedStation.name}</p>
      <p><strong>Código:</strong> {selectedStation.id}</p>
      <p><strong>Estado:</strong> Paraíba</p>
      <p><strong>Latitude:</strong> -7.12</p>
      <p><strong>Longitude:</strong> -34.86</p>
      <p><strong>Data de criação:</strong> 10/09/2020</p>
    </div>
  ) : null;

  return (
    <div style={{ 
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      backgroundColor: '#161616',
      position: 'relative'
    }}>
      <div style={{ 
        display: 'flex',
        justifyContent: 'space-around',
        width: '80%',
        marginBottom: '20px',
        color: '#fff'
      }}>
        <div>
          <p>TEMPERATURA</p>
          <p>ICONE TEMP</p>
          <h3>30º</h3>
        </div>
        <div>
          <p>PRESSÃO</p>
          <p>ICONE PRE</p>
          <h3>10</h3>
        </div>
        <div>
          <p>UMIDADE</p>
          <p>ICONE UMI</p>
          <h3>10</h3>
        </div>
        <div>
          <p>CHUVA</p>
          <p>ICONE CHU</p>
          <h3>10</h3>
        </div>
      </div>
      <ParaibaSVG style={{ width: '80%', height: 'auto' }} />
      {stationInfo}
    </div>
  );
};

export default ParaibaMap;
