import React from 'react';

const DashBar = ({ states, onSelectState, selectedState }) => {
  return (
    <aside style={{
      width: '300px',
      backgroundColor: '#f0f0f0',
      padding: '20px',
      borderRight: '1px solid #ccc'
    }}>
      <h2>Dashboard</h2>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="state-select">Estado</label>
        <select 
          id="state-select" 
          style={{ width: '100%', padding: '8px', marginTop: '8px' }}
          onChange={(e) => onSelectState(e.target.value)}
          value={selectedState}
        >
          <option value="">Selecione um estado</option>
          {states.map((state) => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="station-select">Estação</label>
        <select id="station-select" style={{ width: '100%', padding: '8px', marginTop: '8px' }}>
          {/* Opções estação */}
        </select>
      </div>
    </aside>
  );
};

export default DashBar;
