import React, { useEffect, useState } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import brasilStates from '../data/br-states.json';


const BrasilMap = () => {
  const [geoData, setGeoData] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  useEffect(() => {
    try {
      const states = feature(brasilStates, brasilStates.objects.estados).features;
      setGeoData(states);
      console.log('GeoData:', states);
    } catch (error) {
      console.error('Error loading or processing data:', error);
    }
  }, []);

  const projection = geoMercator().scale(800).translate([480, 250]);
  const path = geoPath().projection(projection);

  const handleClick = (state) => {
    setSelectedState(state);
  };

  return (
    <div>
      <svg width={960} height={600}>
        {geoData &&
          geoData.map((d, i) => {
            const pathData = path(d);
            return (
              <path
                key={`path-${i}`}
                d={pathData}
                className="state"
                fill="#ccc"
                stroke="#000"
                onClick={() => handleClick(d)}
              />
            );
          })}
      </svg>
      {selectedState && (
        <div className="sidebar">
          <h2>{selectedState.properties.nome}</h2>
          <p>Estações Meteórologicas: { "Vazio" /* data here */}</p>
        </div>
      )}
      <p>--------</p>
    </div>
  );
};

export default BrasilMap;
