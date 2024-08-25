// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Papa from 'papaparse';

// const SideBar = ({ id, name, latitude, longitude, onClose }) => {
//   const navigate = useNavigate();
//   const [stationNumber, setStationNumber] = useState(0);

//   useEffect(() => {
//     Papa.parse('/data/CatalogoEstacoesAutomaticas.csv', {
//       download: true,
//       header: true,
//       delimiter: ';',
//       complete: (result) => {
//         const count = result.data.filter(station => station.SG_ESTADO?.trim() === id?.trim().toUpperCase()).length;
//         setStationNumber(count);
//       },
//       error: (error) => {
//         console.error('Error parsing CSV:', error);
//       }
//     });
//   }, [id]);

//   const handleNavigate = () => {
//     navigate(`/stations/${id}`, { state: { stateId: id, name: name } });
//   };

//   return (
//     <aside style={styles.sidebar}>
//       <button style={styles.closeButton} onClick={onClose}>X</button>
//       <h2>{name}</h2>
//       <p><strong>Estações Meteorológicas:</strong> {stationNumber}</p>
//       <p><strong>Latitude:</strong> {latitude}</p>
//       <p><strong>Longitude:</strong> {longitude}</p>
//       <button style={styles.link} onClick={handleNavigate}>
//         Lista de Estações Meteorológicas
//       </button>
//     </aside>
//   );
// };

// const styles = {
//   sidebar: {
//     position: 'fixed',
//     top: 0,
//     right: 0,
//     width: '300px',
//     height: '100%',
//     backgroundColor: '#fff',
//     padding: '20px',
//     boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
//     zIndex: 1000,
//   },
//   closeButton: {
//     backgroundColor: 'transparent',
//     border: 'none',
//     fontSize: '18px',
//     cursor: 'pointer',
//     float: 'right',
//   },
//   link: {
//     color: 'blue',
//     textDecoration: 'underline',
//     cursor: 'pointer',
//     background: 'none',
//     border: 'none',
//     fontSize: '16px',
//     padding: 0,
//   }
// };

// export default SideBar;
