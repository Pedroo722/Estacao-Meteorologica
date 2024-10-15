import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const selectedStationIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41]
});

const Map = ({ selectedStation, stations, setSelectedStation }) => {
  const defaultPosition = [-7.1210, -36.7246]; // Centro geográfico da Paraíba
  const zoomLevel = 7; // Nível de zoom para mostrar a Paraíba

  return (
    <MapContainer center={defaultPosition} zoom={zoomLevel} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Exibe todas as estações meteorológicas com círculo */}
      {stations.map((station) => (
        <Circle
          key={station.id}
          center={[station.latitude, station.longitude]}
          radius={20000} 
          color={"#B22222"} // Muda para verde se for a estação selecionada
          fillColor={"#B22222"} // Muda a cor de preenchimento
          fillOpacity={0.6}
          eventHandlers={{
            click: () => {
              console.log("Estação clicada:", station); // Verifica se o clique funciona
              setSelectedStation(station); // Atualiza a estação selecionada ao clicar
            },
          }}
        >
          <Popup>
            <strong>{station.name}</strong><br />
            ID: {station.id}
          </Popup>
          <Tooltip direction="top" offset={[0, -20]} opacity={1}>
            {station.name}
          </Tooltip>
        </Circle>
      ))}

      {/* Exibe um marcador para a estação selecionada */}
      {selectedStation && (
        <>
        <Circle
          center={[selectedStation.latitude, selectedStation.longitude]}
          radius={20000}
          color={"#03624C"} // Cor verde para a estação selecionada
          fillColor={"#03624C"}
          fillOpacity={0.6}
        >
          <Popup>
            <strong>{selectedStation.name}</strong><br />
            ID: {selectedStation.id}
          </Popup>
          <Tooltip direction="top" offset={[0, -20]} opacity={1}>
            {selectedStation.name}
          </Tooltip>
        </Circle>
    
        <Marker
          position={[selectedStation.latitude, selectedStation.longitude]}
          icon={selectedStationIcon}
        >
          <Popup>
            <strong>{selectedStation.name}</strong><br />
            ID: {selectedStation.id}
          </Popup>
        </Marker>
      </>
      )}
    </MapContainer>
  );
};

export default Map;
