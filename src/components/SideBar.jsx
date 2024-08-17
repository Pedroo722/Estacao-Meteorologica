import React from 'react';

const SideBar = ({ id, name, latitude, longitude, onClose }) => {
  return (
    <div style={styles.sidebar}>
      <button style={styles.closeButton} onClick={onClose}>X</button>
      <h2>{name}</h2>
      <p><strong>Latitude:</strong> {latitude}</p>
      <p><strong>Longitude:</strong> {longitude}</p>
      <a href={`Estacao-Meteorologica/#/stations/${name}`}>Lista de Estações Meteorológicas</a>
    </div>
  );
};

const styles = {
  sidebar: {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '300px',
    height: '100%',
    backgroundColor: '#fff',
    padding: '20px',
    boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
    zIndex: 1000,
  },
  closeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    float: 'right',
  },
  link: {
    color: 'blue',
    textDecoration: 'underline',
    cursor: 'pointer',
  }
};

export default SideBar;
