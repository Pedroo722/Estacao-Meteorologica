import React from "react";
import { geoCentroid } from "d3-geo";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation
} from "react-simple-maps";

import brTopoJson from "../data/Brazilian_States-topo.json";

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

const BrasilMap = () => {
  const handleGeographyClick = (geoId) => {
    console.log(`Estado clicado: ${geoId}`);
  };

  const renderGeograph = (dataSource, countryId, countryColor) => {
    return (
      <Geographies geography={dataSource}>
        {({ geographies }) => (
          <>
            {geographies.map((geo) => {
              const stateName = geo.properties.name;
              return (
                <Geography
                  key={geo.rsmKey + "-Geography"}
                  stroke="#FFF"
                  geography={geo}
                  onClick={() => handleGeographyClick(stateName)}
                  style={{
                    default: {
                      ...geographyStyle,
                      fill: countryColor
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
              const geoId = geo.properties.id;
              const annotationOffset =
                statesWithAnnotations[`${countryId}_${geoId}`];
              const tagPosition = annotationOffset?.tag || {
                x: 2,
                y: 0,
                fontSize: 12
              };
              return (
                <g
                  key={`${geo.rsmKey}-Marker`}
                  style={{ pointerEvents: "none" }}
                >
                  {annotationOffset ? (
                    <Annotation
                      connectorProps={{
                        stroke: "rgb(239,171,11)"
                      }}
                      subject={centroid}
                      dx={annotationOffset.annotation.x}
                      dy={annotationOffset.annotation.y}
                    >
                      <text
                        x={tagPosition.x}
                        y={tagPosition.y}
                        fontSize={tagPosition.fontSize}
                        alignmentBaseline="middle"
                      >
                        {geoId}
                      </text>
                    </Annotation>
                  ) : (
                    <Marker coordinates={centroid}>
                      <text
                        x={tagPosition.x}
                        y={tagPosition.y}
                        fontSize={tagPosition.fontSize}
                        textAnchor="middle"
                      >
                        {geoId}
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
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      backgroundColor: '#e0f7fa'
    }}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 800,
          center: [-54, -15]
        }}
        width={1000}
        height={1000}
        style={{ margin: '-200px'}}
      >
        {renderGeograph(brTopoJson, "BR", "green")}
      </ComposableMap>
    </div>
  );
};

export default BrasilMap;