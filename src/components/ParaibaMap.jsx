import React from 'react';
import { ReactComponent as ParaibaSVG } from '../data/ParaibaMap.svg';
import { ReactComponent as ParaibaAreiaSVG } from '../data/Paraiba_map_Areia.svg';
import { ReactComponent as ParaibaCabaceirasSVG } from '../data/Paraiba_map_Cabaceiras.svg';
import { ReactComponent as ParaibaCamaratubaSVG } from '../data/Paraiba_map_Camaratuba.svg';
import { ReactComponent as ParaibaCGSVG } from '../data/Paraiba_map_CG.svg';
import { ReactComponent as ParaibaItaporangaSVG } from '../data/Paraiba_map_Itaporanga.svg';
import { ReactComponent as ParaibaJPSVG } from '../data/Paraiba_map_JP.svg';
import { ReactComponent as ParaibaMonteiroSVG } from '../data/Paraiba_map_Monteiro.svg';
import { ReactComponent as ParaibaPatosSVG } from '../data/Paraiba_map_Patos.svg';
import { ReactComponent as ParaibaSaoGoncaloSVG } from '../data/Paraiba_map_SaoGoncalo.svg';

const ParaibaMap = ({ selectedStation, setSelectedStation }) => {
  const handleStationClick = (e) => {
    const target = e.target;

    if (target.id) {
      const stations = {
        'Areia': { id: 'A310', name: 'Areia' },
        'Cabaceiras': { id: 'A348', name: 'Cabaceiras' },
        'Camaratuba': { id: 'A352', name: 'Camaratuba' },
        'Campina Grande': { id: 'A313', name: 'Campina Grande' },
        'Itaporanga': { id: 'A373', name: 'Itaporanga' },
        'João Pessoa': { id: 'A320', name: 'João Pessoa' },
        'Monteiro': { id: 'A334', name: 'Monteiro' },
        'Patos': { id: 'A321', name: 'Patos' },
        'São Gonçalo': { id: 'A333', name: 'São Gonçalo' },
      };

      const stationData = stations[target.id];
      if (stationData) {
//        console.log(stationData);
        setSelectedStation(stationData);
      }
    }
  };

  // Seleciona o SVG correto baseado na estação selecionada
  const renderMap = () => {
    switch (selectedStation?.name) {
      case 'Areia':
        return <ParaibaAreiaSVG style={{ width: '80%', height: 'auto' }} onClick={handleStationClick} />;
      case 'Cabaceiras':
        return <ParaibaCabaceirasSVG style={{ width: '80%', height: 'auto' }} onClick={handleStationClick} />;
      case 'Camaratuba':
        return <ParaibaCamaratubaSVG style={{ width: '80%', height: 'auto' }} onClick={handleStationClick} />;
      case 'Campina Grande':
        return <ParaibaCGSVG style={{ width: '80%', height: 'auto' }} onClick={handleStationClick} />;
      case 'Itaporanga':
        return <ParaibaItaporangaSVG style={{ width: '80%', height: 'auto' }} onClick={handleStationClick} />;
      case 'João Pessoa':
        return <ParaibaJPSVG style={{ width: '80%', height: 'auto' }} onClick={handleStationClick} />;
      case 'Monteiro':
        return <ParaibaMonteiroSVG style={{ width: '80%', height: 'auto' }} onClick={handleStationClick} />;
      case 'Patos':
        return <ParaibaPatosSVG style={{ width: '80%', height: 'auto' }} onClick={handleStationClick} />;
      case 'São Gonçalo':
        return <ParaibaSaoGoncaloSVG style={{ width: '80%', height: 'auto' }} onClick={handleStationClick} />;
      default:
        return <ParaibaSVG style={{ width: '80%', height: 'auto' }} onClick={handleStationClick} />;
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
      backgroundColor: '#042222',
      borderRadius: '20px',
      position: 'relative'
    }}>
      {/* <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        width: '80%',
        marginBottom: '20px',
        color: '#fff'
      }}> */}
        {/* <div>
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
        </div> */} 
        {/* Seria melhor separado? */}
      {/* </div> */}
      {renderMap()}
    </div>
  );
};

export default ParaibaMap;
