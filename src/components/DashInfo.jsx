import React from 'react';

const DashInfo = ({ id, name }) => {
  return (
    <div style={{
      width: '100%',
      padding: '10px',
      backgroundColor: '#f1f1f1',
      borderTop: '1px solid #ddd',
      display: 'flex',
      justifyContent: 'space-around',
      position: 'fixed',
      bottom: 0,
      left: 0
    }}>
      <div>
        <strong>Estado:</strong> {name} ({id})
      </div>
      <div>
        <strong>Número de Estações Metereólogicas:</strong> TBD
      </div>
      <div>
        <strong>Lista de Estações Metereólogicas:</strong> <a href='/'>TBD</a>
      </div>
    </div>
  );
};

export default DashInfo;