import React from 'react';
import { ReactComponent as ParaibaSVG } from '../data/ParaibaMap.svg';

const ParaibaMap = ({ selectedStation, setSelectedStation }) => {
  const handleStationClick = (e) => {
    const target = e.target;

    if (target.id) {
      console.log(`Clicked on station ID: ${target.id}`);

      const stations = {
        'Areia': { id: 'A310', name: 'Areia' },
        'Cabaceiras': { id: 'A348', name: 'Cabaceiras' },
        'Camatuba': { id: 'A352', name: 'Camatuba' },
        'Campina Grande': { id: 'A313', name: 'Campina Grande' },
        'Itaporanga': { id: 'A373', name: 'Itaporanga' },
        'João Pessoa': { id: 'A320', name: 'João Pessoa' },
        'Monteiro': { id: 'A334', name: 'Monteiro' },
        'Patos': { id: 'A321', name: 'Patos' },
        'São Gonçalo': { id: 'A333', name: 'São Gonçalo' },
      };

      const stationData = stations[target.id];
      if (stationData) {
        console.log(stationData);
        setSelectedStation(stationData);
      }
    }
  };

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
          <p>ICONE TEMPERATURA</p>
          <h3>30º</h3>
        </div>
        <div>
          <p>PRESSÃO</p>
          <p>ICONE PRESSÃO</p>
          <h3>10</h3>
        </div>
        <div>
          <p>UMIDADE</p>
          <p>ICONE UMIDADE</p>
          <h3>10</h3>
        </div>
        <div>
          <p>CHUVA</p>
          <p>ICONE CHUVA</p>
          <h3>10</h3>
        </div>
      </div>
      <ParaibaSVG style={{ width: '80%', height: 'auto' }} onClick={handleStationClick} />
    </div>
  );
};

export default ParaibaMap;
