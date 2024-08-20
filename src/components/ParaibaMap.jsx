import React, { useEffect, useState } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import paraibaData from '../data/Paraiba-topo.json'; 

const ParaibaMap = () => {
  const [geoData, setGeoData] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  useEffect(() => {
    try {
      const stateFeature = feature(paraibaData, paraibaData.objects.municipios).features;
      setGeoData(stateFeature);
      console.log('GeoData:', stateFeature);
    } catch (error) {
      console.error('Error loading or processing data:', error);
    }
  }, []);

  const projection = geoMercator().scale(1000).translate([480, 300]);
  const path = geoPath().projection(projection);

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
              fill="none"
              stroke="#000"
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
