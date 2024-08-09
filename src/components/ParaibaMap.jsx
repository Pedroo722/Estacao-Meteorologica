import React, { useEffect, useState } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import paraibaData from '../data/25.json'; // Certifique-se de que este caminho está correto

const ParaibaMap = () => {
  const [geoData, setGeoData] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  useEffect(() => {
    try {
      // Convert TopoJSON to GeoJSON
      const stateFeature = feature(paraibaData, paraibaData.objects.municipios).features;
      setGeoData(stateFeature);
      console.log('GeoData:', stateFeature); // Debugging step
    } catch (error) {
      console.error('Error loading or processing data:', error);
    }
  }, []);

  // Define projection and path generator
  const projection = geoMercator().scale(1000).translate([480, 300]);
  const path = geoPath().projection(projection);

  // Handle state click
  const handleClick = (state) => {
    setSelectedState(state);
  };

  return (
    <div>
      <svg width={960} height={600}>
        {geoData && geoData.map((d, i) => {
          const pathData = path(d);
          return (
            <path
              key={`path-${i}`}
              d={pathData}
              fill="none" // Remover a cor de preenchimento
              stroke="#000" // Apenas uma borda preta para os contornos
              onClick={() => handleClick(d)}
            />
          );
        })}
      </svg>
      {selectedState && (
        <div className="sidebar">
          <h2>{selectedState.properties.nome}</h2>
          <p>Detalhes sobre o estado...</p>
        </div>
      )}
    </div>
  );
};

export default ParaibaMap;