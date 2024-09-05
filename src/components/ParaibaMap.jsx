import React from 'react';
import { ReactComponent as ParaibaSVG } from '../data/ParaibaMap.svg';
    
const ParaibaMap = () => {
  return (
    <div style={{ 
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'hidden',
      backgroundColor: '#e0f7fa',
      position: 'relative'
    }}>
      <h2 style={{ textAlign: 'center', margin: '20px 0', fontSize: '27px' }}>Mapa Barasileiro</h2>
      <ParaibaSVG />
    </div>
  );
};

export default ParaibaMap;