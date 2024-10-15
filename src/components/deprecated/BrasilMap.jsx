import React, { useState } from "react";
import { geoCentroid } from "d3-geo";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation
} from "react-simple-maps";
import brTopoJson from "../../data/Brazilian_States-topo.json";

const statesWithAnnotations = {
  BR_DF: {
    annotation: { x: -10, y: -15 },
    tag: { fontSize: 14, x: 4, y: 0 }
  },
  BR_RN: {
    annotation: { x: 28, y: 0 },
    tag: { fontSize: 14, x: 4, y: 0 }
  },
  BR_PB: {
    annotation: { x: 32, y: 0 },
    tag: { fontSize: 14, x: 4, y: 0 }
  },
  BR_PE: {
    annotation: { x: 50, y: 0 },
    tag: { fontSize: 14, x: 4, y: 0 }
  },
  BR_AL: {
    annotation: { x: 30, y: 0 },
    tag: { fontSize: 14, x: 4, y: 0 }
  },
  BR_SE: {
    annotation: { x: 25, y: 0 },
    tag: { fontSize: 14, x: 4, y: 0 }
  },
  BR_ES: {
    annotation: { x: 20, y: 0 },
    tag: { fontSize: 14, x: 4, y: 0 }
  },
  BR_RJ: {
    annotation: { x: 25, y: 0 },
    tag: { fontSize: 14, x: 4, y: 0 }
  },
  PY_AM: {
    annotation: { x: 16, y: -10 },
    tag: { fontSize: 14, x: 2, y: 0 }
  },
  PY_AA: {
    annotation: { x: 15, y: 0 },
    tag: { fontSize: 14, x: 4, y: 0 }
  },
  PY_GU: {
    annotation: { x: -90, y: 75 },
    tag: { fontSize: 14, x: 2, y: 8 }
  },
  PY_PG: {
    annotation: { x: -130, y: 30 },
    tag: { fontSize: 14, x: 4, y: 10 }
  },
  PY_CZ: {
    annotation: { x: -40, y: 100 },
    tag: { fontSize: 14, x: 0, y: 8 }
  },
  PY_NE: {
    annotation: { x: -100, y: 45 },
    tag: { fontSize: 14, x: 4, y: 8 }
  },
  PY_CE: {
    annotation: { x: -110, y: 10 },
    tag: { fontSize: 14, x: 4, y: 10 }
  },
  PY_CR: {
    annotation: { x: -100, y: -30 },
    tag: { fontSize: 14, x: -4, y: 12 }
  },
  PY_AS: {
    annotation: { x: -110, y: -10 },
    tag: { fontSize: 14, x: 4, y: 10 }
  },
  PY_MI: {
    annotation: { x: -25, y: 30 },
    tag: { fontSize: 14, x: -5, y: 10 }
  }
};

const geographyStyle = {
  fill: "#ECEFF1",
  stroke: "#607D8B",
  strokeWidth: 1,
  outline: "none",
  cursor: "pointer",
  transition: "all .2s"
};

const BrasilMap = ({ onStateClick }) => {
  const [selectedStateId, setSelectedStateId] = useState(null);

  const handleGeographyClick = (geo) => {
    const { id, name, latitude, longitude } = geo.properties;
    if (id && name && latitude && longitude) {
      setSelectedStateId(id);
      onStateClick({ id, name, latitude, longitude });
    }
  };

  const renderGeograph = (dataSource) => {
    return (
      <Geographies geography={dataSource}>
        {({ geographies }) => (
          <>
            {geographies.map((geo) => {
              const isSelected = geo.properties.id === selectedStateId;
              return (
                <Geography
                  key={geo.rsmKey + "-Geography"}
                  stroke="#FFF"
                  geography={geo}
                  onClick={() => handleGeographyClick(geo)}
                  style={{
                    default: {
                      ...geographyStyle,
                      fill: isSelected ? "lightgreen" : "#ECEFF1"
                    },
                    hover: {
                      ...geographyStyle,
                      fill: "lightgreen"
                    },
                    pressed: {
                      ...geographyStyle,
                      fill: "lightgreen",
                    }
                  }}
                />
              );
            })}
            {geographies.map((geo) => {
              const centroid = geoCentroid(geo);
              const stateId = geo.properties.id;

              return (
                <g key={geo.rsmKey + "-name"}>
                  {statesWithAnnotations[stateId] ? (
                    <Annotation
                      subject={centroid}
                      dx={statesWithAnnotations[stateId].annotation.x}
                      dy={statesWithAnnotations[stateId].annotation.y}
                      connectorProps={{
                        stroke: "#607D8B",
                        strokeWidth: 1,
                        strokeLinecap: "round"
                      }}
                    >
                      <text
                        x={statesWithAnnotations[stateId].tag.x}
                        y={statesWithAnnotations[stateId].tag.y}
                        textAnchor="middle"
                        alignmentBaseline="middle"
                        style={{
                          fontSize: statesWithAnnotations[stateId].tag.fontSize,
                          fill: "#607D8B"
                        }}
                      >
                        {stateId.replace("BR_", "")}
                      </text>
                    </Annotation>
                  ) : (
                    <Marker coordinates={centroid}>
                      <text
                        textAnchor="middle"
                        alignmentBaseline="middle"
                        style={{
                          fontSize: 20,
                          fill: "#000000"
                        }}
                      >
                        {stateId.replace("BR_", "")}
                      </text>
                    </Marker>
                  )}
                </g>
              );
            })}
          </>
        )}
      </Geographies>
    );
  };

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
      <h2 style={{ textAlign: 'center', margin: '20px 0', fontSize: '27px' }}>Mapa Brasileiro</h2>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 1200,
          center: [-54, -15]
        }}
        width={1000}
        height={1000}
      >
        {renderGeograph(brTopoJson)}
      </ComposableMap>
    </div>
  );
};

export default BrasilMap;