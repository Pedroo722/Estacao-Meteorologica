// // // // // import React, { useEffect, useRef, useState } from 'react';
// // // // // import * as d3 from 'd3';
// // // // // import { Button } from 'antd';

// // // // // const DryBulbTempChart = ({ data, finalDateType }) => {
// // // // //   const chartRef = useRef();
// // // // //   const [showMin, setShowMin] = useState(true);
// // // // //   const [showMax, setShowMax] = useState(true);
// // // // //   const [showInstant, setShowInstant] = useState(true);

// // // // //   useEffect(() => {
// // // // //     console.log(data);
// // // // //     if (!data || data.length === 0) return;

// // // // //     // Limpar o gráfico existente no DOM
// // // // //     d3.select(chartRef.current).selectAll('*').remove();

// // // // //     const margin = { top: 20, right: 30, bottom: 40, left: 60 };
// // // // //     const width = 1200 - margin.left - margin.right;
// // // // //     const height = 450 - margin.top - margin.bottom;

// // // // //     const svg = d3.select(chartRef.current)
// // // // //       .append('svg')
// // // // //       .attr('width', width + margin.left + margin.right)
// // // // //       .attr('height', height + margin.top + margin.bottom)
// // // // //       .append('g')
// // // // //       .attr('transform', `translate(${margin.left},${margin.top})`);

// // // // //     const x = d3.scaleLinear()
// // // // //       .domain(finalDateType === 'dia' ? [1, 23] : [1, 31])
// // // // //       .range([0, width]);

// // // // //     const temperatures = data.flatMap(d => [
// // // // //       d.tempBulboSeco,
// // // // //       d.tempMax,
// // // // //       d.tempMin,
// // // // //     ]).filter(t => t !== null && !isNaN(t));
    
// // // // //     const minTemp = Math.min(...temperatures) - 1;
// // // // //     const maxTemp = Math.max(...temperatures) + 1;

// // // // //     const y = d3.scaleLinear()
// // // // //       .domain([minTemp, maxTemp])
// // // // //       .range([height, 0]);

// // // // //     svg.append('g')
// // // // //       .attr('transform', `translate(0,${height})`)
// // // // //       .call(d3.axisBottom(x).ticks(finalDateType === 'dia' ? 23 : 31)
// // // // //         .tickFormat(d => finalDateType === 'dia' ? `${d.toString().padStart(2, '0')}:00` : `Dia ${d}`));

// // // // //     svg.append('g')
// // // // //       .call(d3.axisLeft(y).ticks(10).tickFormat(d => `${d.toFixed(1)} °C`));

// // // // //     const tempStep = 1;
// // // // //     for (let temp = Math.ceil(minTemp / tempStep) * tempStep; temp <= maxTemp; temp += tempStep) {
// // // // //       svg.append('line')
// // // // //         .attr('x1', 0)
// // // // //         .attr('x2', width)
// // // // //         .attr('y1', y(temp))
// // // // //         .attr('y2', y(temp))
// // // // //         .attr('stroke', 'gray')
// // // // //         .attr('stroke-dasharray', '5,5')
// // // // //     }

// // // // //     const drawLineAndPoints = (dataset, color, show) => {
// // // // //       if (!show) return;

// // // // //       const line = d3.line()
// // // // //         .x((d, i) => x(i + 1))
// // // // //         .y(d => (d !== null ? y(d) : height));

// // // // //       svg.append("path")
// // // // //         .datum(dataset)
// // // // //         .attr("fill", "none")
// // // // //         .attr("stroke", color)
// // // // //         .attr("stroke-width", 2)
// // // // //         .attr("d", line);

// // // // //       svg.selectAll(".dot-" + color)
// // // // //         .data(dataset)
// // // // //         .enter().append("circle")
// // // // //         .attr("class", "dot-" + color)
// // // // //         .attr("cx", (d, i) => x(i + 1))
// // // // //         .attr("cy", d => (d !== null ? y(d) : height))
// // // // //         .attr("r", 4)
// // // // //         .attr("fill", color)
// // // // //         .on("click", function (event, d) {
// // // // //           const alertMessage = finalDateType === 'dia'
// // // // //             ? `Valor do Horário: ${d !== null ? d.toFixed(1) + ' °C' : 'Dado Ausente'}` 
// // // // //             : `Média Diária: ${d !== null ? d.toFixed(1) + ' °C' : 'Dado Ausente'}`;
// // // // //           alert(alertMessage);
// // // // //         });
// // // // //     };

// // // // //     let averagesAvailable = false;

// // // // //     if (finalDateType === 'dia') {
// // // // //       const hourValues = Array.from({ length: 24 }, () => ({ instant: [], max: [], min: [] }));

// // // // //       data.forEach(d => {
// // // // //         const hourString = d.hora.replace(" UTC", "");
// // // // //         const hour = parseInt(hourString.slice(0, 2), 10);

// // // // //         if (hour >= 0 && hour < 24) {
// // // // //           if (!isNaN(d.tempBulboSeco)) hourValues[hour].instant.push(d.tempBulboSeco);
// // // // //           if (!isNaN(d.tempMax)) hourValues[hour].max.push(d.tempMax);
// // // // //           if (!isNaN(d.tempMin)) hourValues[hour].min.push(d.tempMin);
// // // // //         }
// // // // //       });

// // // // //       const hourAverages = hourValues.map(values => ({
// // // // //         instant: values.instant.length > 0 ? d3.mean(values.instant) : null,
// // // // //         max: values.max.length > 0 ? d3.mean(values.max) : null,
// // // // //         min: values.min.length > 0 ? d3.mean(values.min) : null,
// // // // //       }));

// // // // //       averagesAvailable = hourAverages.some(avg => avg.instant !== null || avg.max !== null || avg.min !== null);

// // // // //       if (averagesAvailable) {
// // // // //         drawLineAndPoints(hourAverages.map(d => d.min), 'green', showMin);
// // // // //         drawLineAndPoints(hourAverages.map(d => d.max), 'red', showMax);
// // // // //         drawLineAndPoints(hourAverages.map(d => d.instant), 'steelblue', showInstant);
// // // // //       }
// // // // //     } else {
// // // // //       const dayValues = Array.from({ length: 31 }, () => ({ instant: [], max: [], min: [] }));

// // // // //       data.forEach(d => {
// // // // //         const dayString = d.hora;
// // // // //         const day = parseInt(dayString.split(' ')[1], 10) - 1;

// // // // //         if (day >= 0 && day < 31) {
// // // // //           if (!isNaN(d.tempBulboSeco)) dayValues[day].instant.push(d.tempBulboSeco);
// // // // //           if (!isNaN(d.tempMax)) dayValues[day].max.push(d.tempMax);
// // // // //           if (!isNaN(d.tempMin)) dayValues[day].min.push(d.tempMin);
// // // // //         } else {
// // // // //           console.warn(`Day ${day + 1} está fora do alcance do mês: ${dayString}`);
// // // // //         }
// // // // //       });

// // // // //       const dayAverages = dayValues.map(values => ({
// // // // //         instant: values.instant.length > 0 ? d3.mean(values.instant) : null,
// // // // //         max: values.max.length > 0 ? d3.mean(values.max) : null,
// // // // //         min: values.min.length > 0 ? d3.mean(values.min) : null,
// // // // //       }));

// // // // //       averagesAvailable = dayAverages.some(avg => avg.instant !== null || avg.max !== null || avg.min !== null);

// // // // //       if (averagesAvailable) {
// // // // //         drawLineAndPoints(dayAverages.map(d => d.min), 'green', showMin);
// // // // //         drawLineAndPoints(dayAverages.map(d => d.max), 'red', showMax);
// // // // //         drawLineAndPoints(dayAverages.map(d => d.instant), 'steelblue', showInstant);
// // // // //       }
// // // // //     }
// // // // //   }, [data, showMin, showMax, showInstant, finalDateType]);

// // // // //   return (
// // // // //     <div>
// // // // //       <h2>Gráfico de Temperatura de Bulbo Seco</h2>
// // // // //       <div ref={chartRef}></div>
// // // // //       <div>
// // // // //         <Button 
// // // // //           type="primary" 
// // // // //           style={{ backgroundColor: 'green', borderColor: 'green', marginLeft: '10px' }} 
// // // // //           onClick={() => setShowMin(!showMin)}>
// // // // //           {showMin ? 'Ocultar Temp. Mínima' : 'Mostrar Temp. Mínima'}
// // // // //         </Button>
// // // // //         <Button 
// // // // //           type="primary" 
// // // // //           style={{ backgroundColor: 'red', borderColor: 'red', marginLeft: '10px' }} 
// // // // //           onClick={() => setShowMax(!showMax)}>
// // // // //           {showMax ? 'Ocultar Temp. Máxima' : 'Mostrar Temp. Máxima'}
// // // // //         </Button>
// // // // //         <Button 
// // // // //           type="primary" 
// // // // //           style={{ backgroundColor: 'blue', borderColor: 'blue', marginLeft: '10px' }} 
// // // // //           onClick={() => setShowInstant(!showInstant)}>
// // // // //           {showInstant ? 'Ocultar Temp. Instantânea' : 'Mostrar Temp. Instantânea'}
// // // // //         </Button>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default DryBulbTempChart;

// // // // import React, { useEffect, useRef } from 'react';
// // // // import * as echarts from 'echarts';

// // // // const TemperatureChart = () => {
// // // //   const chartRef = useRef(null);

// // // //   useEffect(() => {
// // // //     // Inicializa o gráfico
// // // //     const chartInstance = echarts.init(chartRef.current);

// // // //     // Define as opções do gráfico
// // // //     const option = {
// // // //       title: {
// // // //         text: 'Temperature Change in the Coming Week',
// // // //       },
// // // //       tooltip: {
// // // //         trigger: 'axis',
// // // //       },
// // // //       legend: {},
// // // //       toolbox: {
// // // //         show: true,
// // // //         feature: {
// // // //           dataZoom: {
// // // //             yAxisIndex: 'none',
// // // //           },
// // // //           dataView: { readOnly: false },
// // // //           magicType: { type: ['line', 'bar'] },
// // // //           restore: {},
// // // //           saveAsImage: {},
// // // //         },
// // // //       },
// // // //       xAxis: {
// // // //         type: 'category',
// // // //         boundaryGap: false,
// // // //         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
// // // //       },
// // // //       yAxis: {
// // // //         type: 'value',
// // // //         axisLabel: {
// // // //           formatter: '{value} °C',
// // // //         },
// // // //       },
// // // //       series: [
// // // //         {
// // // //           name: 'Highest',
// // // //           type: 'line',
// // // //           data: [10, 11, 13, 11, 12, 12, 9],
// // // //           markPoint: {
// // // //             data: [
// // // //               { type: 'max', name: 'Max' },
// // // //               { type: 'min', name: 'Min' },
// // // //             ],
// // // //           },
// // // //           markLine: {
// // // //             data: [{ type: 'average', name: 'Avg' }],
// // // //           },
// // // //         },
// // // //         {
// // // //           name: 'Lowest',
// // // //           type: 'line',
// // // //           data: [1, -2, 2, 5, 3, 2, 0],
// // // //           markPoint: {
// // // //             data: [{ name: 'Lowest', value: -2, xAxis: 1, yAxis: -1.5 }],
// // // //           },
// // // //           markLine: {
// // // //             data: [
// // // //               { type: 'average', name: 'Avg' },
// // // //               [
// // // //                 {
// // // //                   symbol: 'none',
// // // //                   x: '90%',
// // // //                   yAxis: 'max',
// // // //                 },
// // // //                 {
// // // //                   symbol: 'circle',
// // // //                   label: {
// // // //                     position: 'start',
// // // //                     formatter: 'Max',
// // // //                   },
// // // //                   type: 'max',
// // // //                   name: 'Highest Point',
// // // //                 },
// // // //               ],
// // // //             ],
// // // //           },
// // // //         },
// // // //       ],
// // // //     };

// // // //     // Aplica as opções ao gráfico
// // // //     chartInstance.setOption(option);

// // // //     // Limpeza ao desmontar o componente
// // // //     return () => {
// // // //       chartInstance.dispose();
// // // //     };
// // // //   }, []);

// // // //   return (
// // // //     <div
// // // //       ref={chartRef}
// // // //       style={{ width: '100%', height: '400px' }}
// // // //     />
// // // //   );
// // // // };

// // // // export default TemperatureChart;


// // // import React, { useEffect, useRef, useState } from 'react';
// // // import * as echarts from 'echarts';
// // // import { Button } from 'antd';

// // // const DryBulbTempChart = ({ data, finalDateType }) => {
// // //   const chartRef = useRef();
// // //   const [showMin, setShowMin] = useState(true);
// // //   const [showMax, setShowMax] = useState(true);
// // //   const [showInstant, setShowInstant] = useState(true);

// // //   useEffect(() => {
// // //     if (!data || data.length === 0) return;

// // //     const chart = echarts.init(chartRef.current);

// // //     const xAxisData = finalDateType === 'dia'
// // //       ? Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`)
// // //       : Array.from({ length: 31 }, (_, i) => `Dia ${i + 1}`);

// // //     const temperatures = data.flatMap(d => [
// // //       d.tempBulboSeco,
// // //       d.tempMax,
// // //       d.tempMin,
// // //     ]).filter(t => t !== null && !isNaN(t));
    
// // //     const minTemp = Math.min(...temperatures) - 1;
// // //     const maxTemp = Math.max(...temperatures) + 1;

// // //     const seriesData = {
// // //       instant: Array(xAxisData.length).fill(null),
// // //       max: Array(xAxisData.length).fill(null),
// // //       min: Array(xAxisData.length).fill(null),
// // //     };

// // //     data.forEach((d, index) => {
// // //       const axisIndex = finalDateType === 'dia'
// // //         ? parseInt(d.hora.slice(0, 2), 10)
// // //         : parseInt(d.hora.split(' ')[1], 10) - 1;

// // //       if (!isNaN(axisIndex) && axisIndex < xAxisData.length) {
// // //         seriesData.instant[axisIndex] = d.tempBulboSeco || null;
// // //         seriesData.max[axisIndex] = d.tempMax || null;
// // //         seriesData.min[axisIndex] = d.tempMin || null;
// // //       }
// // //     });

// // //     const options = {
// // //       title: {
// // //         text: 'Gráfico de Temperatura de Bulbo Seco',
// // //       },
// // //       tooltip: {
// // //         trigger: 'axis',
// // //       },
// // //       legend: {
// // //         data: ['Temp. Instantânea', 'Temp. Máxima', 'Temp. Mínima'],
// // //       },
// // //       xAxis: {
// // //         type: 'category',
// // //         data: xAxisData,
// // //       },
// // //       yAxis: {
// // //         type: 'value',
// // //         axisLabel: {
// // //           formatter: '{value} °C',
// // //         },
// // //         min: minTemp,
// // //         max: maxTemp,
// // //       },
// // //       series: [
// // //         showInstant && {
// // //           name: 'Temp. Instantânea',
// // //           type: 'line',
// // //           data: seriesData.instant,
// // //           smooth: true,
// // //           lineStyle: { color: 'steelblue' },
// // //         },
// // //         showMax && {
// // //           name: 'Temp. Máxima',
// // //           type: 'line',
// // //           data: seriesData.max,
// // //           smooth: true,
// // //           lineStyle: { color: 'red' },
// // //         },
// // //         showMin && {
// // //           name: 'Temp. Mínima',
// // //           type: 'line',
// // //           data: seriesData.min,
// // //           smooth: true,
// // //           lineStyle: { color: 'green' },
// // //         },
// // //       ].filter(Boolean),
// // //     };

// // //     chart.setOption(options);

// // //     return () => {
// // //       chart.dispose();
// // //     };
// // //   }, [data, showMin, showMax, showInstant, finalDateType]);

// // //   return (
// // //     <div>
// // //       <h2>Gráfico de Temperatura de Bulbo Seco</h2>
// // //       <div ref={chartRef} style={{ width: '100%', height: '450px' }}></div>
// // //       <div>
// // //         <Button
// // //           type="primary"
// // //           style={{ backgroundColor: 'green', borderColor: 'green', marginLeft: '10px' }}
// // //           onClick={() => setShowMin(!showMin)}
// // //         >
// // //           {showMin ? 'Ocultar Temp. Mínima' : 'Mostrar Temp. Mínima'}
// // //         </Button>
// // //         <Button
// // //           type="primary"
// // //           style={{ backgroundColor: 'red', borderColor: 'red', marginLeft: '10px' }}
// // //           onClick={() => setShowMax(!showMax)}
// // //         >
// // //           {showMax ? 'Ocultar Temp. Máxima' : 'Mostrar Temp. Máxima'}
// // //         </Button>
// // //         <Button
// // //           type="primary"
// // //           style={{ backgroundColor: 'blue', borderColor: 'blue', marginLeft: '10px' }}
// // //           onClick={() => setShowInstant(!showInstant)}
// // //         >
// // //           {showInstant ? 'Ocultar Temp. Instantânea' : 'Mostrar Temp. Instantânea'}
// // //         </Button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default DryBulbTempChart;
// // import React, { useEffect, useRef, useState } from 'react';
// // import * as d3 from 'd3';
// // import { Button } from 'antd';

// // const DryBulbTempChart = ({ data, finalDateType }) => {
// //   const chartRef = useRef();
// //   const [showMin, setShowMin] = useState(true);
// //   const [showMax, setShowMax] = useState(true);
// //   const [showInstant, setShowInstant] = useState(true);

// //   const saveAsImage = () => {
// //     const svgElement = chartRef.current.querySelector('svg');
// //     const serializer = new XMLSerializer();
// //     const source = serializer.serializeToString(svgElement);
// //     const image = new Image();
// //     const canvas = document.createElement('canvas');
// //     const ctx = canvas.getContext('2d');

// //     canvas.width = svgElement.clientWidth;
// //     canvas.height = svgElement.clientHeight;

// //     image.onload = () => {
// //       ctx.drawImage(image, 0, 0);
// //       const link = document.createElement('a');
// //       link.download = 'chart.png';
// //       link.href = canvas.toDataURL('image/png');
// //       link.click();
// //     };

// //     image.src = 'data:image/svg+xml;base64,' + btoa(source);
// //   };

// //   const resetZoom = () => {
// //     d3.select(chartRef.current).select('svg g').transition().duration(500).attr('transform', null);
// //   };

// //   useEffect(() => {
// //     if (!data || data.length === 0) return;

// //     // Clear existing chart
// //     d3.select(chartRef.current).selectAll('*').remove();

// //     const margin = { top: 20, right: 30, bottom: 40, left: 60 };
// //     const width = 1200 - margin.left - margin.right;
// //     const height = 450 - margin.top - margin.bottom;

// //     const svg = d3.select(chartRef.current)
// //       .append('svg')
// //       .attr('width', width + margin.left + margin.right)
// //       .attr('height', height + margin.top + margin.bottom);

// //     const chartGroup = svg.append('g')
// //       .attr('transform', `translate(${margin.left},${margin.top})`);

// //     const zoom = d3.zoom()
// //       .scaleExtent([1, 10])
// //       .translateExtent([[0, 0], [width, height]])
// //       .on('zoom', (event) => {
// //         chartGroup.attr('transform', event.transform);
// //       });

// //     svg.call(zoom);

// //     const x = d3.scaleLinear()
// //       .domain(finalDateType === 'dia' ? [1, 23] : [1, 31])
// //       .range([0, width]);

// //     const temperatures = data.flatMap(d => [d.tempBulboSeco, d.tempMax, d.tempMin])
// //       .filter(t => t !== null && !isNaN(t));

// //     const minTemp = Math.min(...temperatures) - 1;
// //     const maxTemp = Math.max(...temperatures) + 1;

// //     const y = d3.scaleLinear()
// //       .domain([minTemp, maxTemp])
// //       .range([height, 0]);

// //     // Axes
// //     chartGroup.append('g')
// //       .attr('transform', `translate(0,${height})`)
// //       .call(d3.axisBottom(x));

// //     chartGroup.append('g')
// //       .call(d3.axisLeft(y));

// //     const drawLineAndPoints = (dataset, color, show) => {
// //       if (!show) return;

// //       const line = d3.line()
// //         .x((d, i) => x(i + 1))
// //         .y(d => (d !== null ? y(d) : height));

// //       chartGroup.append('path')
// //         .datum(dataset)
// //         .attr('fill', 'none')
// //         .attr('stroke', color)
// //         .attr('stroke-width', 2)
// //         .attr('d', line);
// //     };

// //     if (finalDateType === 'dia') {
// //       const hourAverages = Array.from({ length: 24 }, () => ({
// //         instant: d3.mean(data.map(d => d.tempBulboSeco).filter(d => d !== null)),
// //         max: d3.mean(data.map(d => d.tempMax).filter(d => d !== null)),
// //         min: d3.mean(data.map(d => d.tempMin).filter(d => d !== null)),
// //       }));

// //       drawLineAndPoints(hourAverages.map(d => d.min), 'green', showMin);
// //       drawLineAndPoints(hourAverages.map(d => d.max), 'red', showMax);
// //       drawLineAndPoints(hourAverages.map(d => d.instant), 'steelblue', showInstant);
// //     }
// //   }, [data, showMin, showMax, showInstant, finalDateType]);

// //   return (
// //     <div>
// //       <div ref={chartRef}></div>
// //       <div style={{ marginTop: '10px' }}>
// //         <Button onClick={resetZoom}>Resetar Zoom</Button>
// //         <Button onClick={saveAsImage} style={{ marginLeft: '10px' }}>Salvar como Imagem</Button>
// //         <Button 
// //           type="primary" 
// //           style={{ backgroundColor: 'green', borderColor: 'green', marginLeft: '10px' }} 
// //           onClick={() => setShowMin(!showMin)}>
// //           {showMin ? 'Ocultar Temp. Mínima' : 'Mostrar Temp. Mínima'}
// //         </Button>
// //         <Button 
// //           type="primary" 
// //           style={{ backgroundColor: 'red', borderColor: 'red', marginLeft: '10px' }} 
// //           onClick={() => setShowMax(!showMax)}>
// //           {showMax ? 'Ocultar Temp. Máxima' : 'Mostrar Temp. Máxima'}
// //         </Button>
// //         <Button 
// //           type="primary" 
// //           style={{ backgroundColor: 'blue', borderColor: 'blue', marginLeft: '10px' }} 
// //           onClick={() => setShowInstant(!showInstant)}>
// //           {showInstant ? 'Ocultar Temp. Instantânea' : 'Mostrar Temp. Instantânea'}
// //         </Button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default DryBulbTempChart;


// import React, { useEffect, useRef, useState } from 'react';
// import * as echarts from 'echarts';
// import { Button } from 'antd';

// const DryBulbTempChart = ({ data, finalDateType }) => {
//   const chartRef = useRef();
//   const [showMin, setShowMin] = useState(true);
//   const [showMax, setShowMax] = useState(true);
//   const [showInstant, setShowInstant] = useState(true);

//   useEffect(() => {
//     if (!data || data.length === 0) return;

//     const chart = echarts.init(chartRef.current);

//     const xAxisData = finalDateType === 'dia'
//       ? Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`)
//       : Array.from({ length: 31 }, (_, i) => `Dia ${i + 1}`);

//     const temperatures = data.flatMap(d => [
//       d.tempBulboSeco,
//       d.tempMax,
//       d.tempMin,
//     ]).filter(t => t !== null && !isNaN(t));
    
//     const minTemp = Math.min(...temperatures) - 1;
//     const maxTemp = Math.max(...temperatures) + 1;

//     const seriesData = {
//       instant: Array(xAxisData.length).fill(null),
//       max: Array(xAxisData.length).fill(null),
//       min: Array(xAxisData.length).fill(null),
//     };

//     data.forEach((d, index) => {
//       const axisIndex = finalDateType === 'dia'
//         ? parseInt(d.hora.slice(0, 2), 10)
//         : parseInt(d.hora.split(' ')[1], 10) - 1;

//       if (!isNaN(axisIndex) && axisIndex < xAxisData.length) {
//         seriesData.instant[axisIndex] = d.tempBulboSeco || null;
//         seriesData.max[axisIndex] = d.tempMax || null;
//         seriesData.min[axisIndex] = d.tempMin || null;
//       }
//     });

//     const options = {
      
//       tooltip: {
//         trigger: 'axis',
//       },
//       legend: {
//         data: ['Temp. Instantânea', 'Temp. Máxima', 'Temp. Mínima'],
//       },
//       xAxis: {
//         type: 'category',
//         data: xAxisData,
//       },
//       yAxis: {
//         type: 'value',
//         axisLabel: {
//           formatter: '{value} °C',
//         },
//         min: minTemp,
//         max: maxTemp,
//       },
//       series: [
//         showInstant && {
//           name: 'Temp. Instantânea',
//           type: 'line',
//           data: seriesData.instant,
//           smooth: true,
//           lineStyle: { color: 'steelblue' },
//         },
//         showMax && {
//           name: 'Temp. Máxima',
//           type: 'line',
//           data: seriesData.max,
//           smooth: true,
//           lineStyle: { color: 'red' },
//         },
//         showMin && {
//           name: 'Temp. Mínima',
//           type: 'line',
//           data: seriesData.min,
//           smooth: true,
//           lineStyle: { color: 'green' },
//         },
//       ].filter(Boolean),
//     };

//     chart.setOption(options);

//     return () => {
//       chart.dispose();
//     };
//   }, [data, showMin, showMax, showInstant, finalDateType]);

//   return (
//     <div>
//       <h2>Gráfico de Temperatura de Bulbo Seco</h2>
//       <div ref={chartRef} style={{ width: '100%', height: '450px' }}></div>
//       <div>
//         <Button
//           type="primary"
//           style={{ backgroundColor: 'green', borderColor: 'green', marginLeft: '10px' }}
//           onClick={() => setShowMin(!showMin)}
//         >
//           {showMin ? 'Ocultar Temp. Mínima' : 'Mostrar Temp. Mínima'}
//         </Button>
//         <Button
//           type="primary"
//           style={{ backgroundColor: 'red', borderColor: 'red', marginLeft: '10px' }}
//           onClick={() => setShowMax(!showMax)}
//         >
//           {showMax ? 'Ocultar Temp. Máxima' : 'Mostrar Temp. Máxima'}
//         </Button>
//         <Button
//           type="primary"
//           style={{ backgroundColor: 'blue', borderColor: 'blue', marginLeft: '10px' }}
//           onClick={() => setShowInstant(!showInstant)}
//         >
//           {showInstant ? 'Ocultar Temp. Instantânea' : 'Mostrar Temp. Instantânea'}
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default DryBulbTempChart;



// import React, { useEffect, useRef, useState } from 'react';
// import * as echarts from 'echarts';
// import { Button } from 'antd';

// const DryBulbTempChart = ({ data, finalDateType }) => {
//   const chartRef = useRef();
//   const [showMin, setShowMin] = useState(true);
//   const [showMax, setShowMax] = useState(true);
//   const [showInstant, setShowInstant] = useState(true);

//   useEffect(() => {
//     if (!data || data.length === 0) return;

//     const chart = echarts.init(chartRef.current);

//     const xAxisData = finalDateType === 'dia'
//       ? Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`)
//       : Array.from({ length: 31 }, (_, i) => `Dia ${i + 1}`);

//     const temperatures = data.flatMap(d => [
//       d.tempBulboSeco,
//       d.tempMax,
//       d.tempMin,
//     ]).filter(t => t !== null && !isNaN(t));

//     const minTemp = Math.min(...temperatures) - 1;
//     const maxTemp = Math.max(...temperatures) + 1;

//     const seriesData = {
//       instant: Array(xAxisData.length).fill(null),
//       max: Array(xAxisData.length).fill(null),
//       min: Array(xAxisData.length).fill(null),
//     };

//     data.forEach((d, index) => {
//       const axisIndex = finalDateType === 'dia'
//         ? parseInt(d.hora.slice(0, 2), 10)
//         : parseInt(d.hora.split(' ')[1], 10) - 1;

//       if (!isNaN(axisIndex) && axisIndex < xAxisData.length) {
//         seriesData.instant[axisIndex] = d.tempBulboSeco || null;
//         seriesData.max[axisIndex] = d.tempMax || null;
//         seriesData.min[axisIndex] = d.tempMin || null;
//       }
//     });

//     const options = {
//       title: {
//         text: 'Gráfico de Temperatura de Bulbo Seco',
//       },
//       tooltip: {
//         trigger: 'axis',
//       },
//       legend: {
//         data: ['Temp. Instantânea', 'Temp. Máxima', 'Temp. Mínima'],
//       },
//       xAxis: {
//         type: 'category',
//         data: xAxisData,
//       },
//       yAxis: {
//         type: 'value',
//         axisLabel: {
//           formatter: '{value} °C',
//         },
//         min: minTemp,
//         max: maxTemp,
//       },
//       series: [
//         showInstant && {
//           name: 'Temp. Instantânea',
//           type: 'line',
//           data: seriesData.instant,
//           smooth: true,
//           lineStyle: { color: 'steelblue' },
//           markPoint: {
//             data: [
//               { type: 'max', name: 'Max' },
//               { type: 'min', name: 'Min' },
//             ],
//           },
//           markLine: {
//             data: [{ type: 'average', name: 'Avg' }],
//           },
//         },
//         showMax && {
//           name: 'Temp. Máxima',
//           type: 'line',
//           data: seriesData.max,
//           smooth: true,
//           lineStyle: { color: 'red' },
//           markPoint: {
//             data: [
//               { type: 'max', name: 'Max' },
//               { name: 'Critical Point', value: 30, xAxis: 2, yAxis: 30 },
//             ],
//           },
//           markLine: {
//             data: [{ type: 'average', name: 'Avg' }],
//           },
//         },
//         showMin && {
//           name: 'Temp. Mínima',
//           type: 'line',
//           data: seriesData.min,
//           smooth: true,
//           lineStyle: { color: 'green' },
//           markPoint: {
//             data: [{ name: 'Lowest', value: -10, xAxis: 1, yAxis: -10 }],
//           },
//           markLine: {
//             data: [
//               { type: 'average', name: 'Avg' },
//               [
//                 { symbol: 'none', x: '90%', yAxis: 'max' },
//                 {
//                   symbol: 'circle',
//                   label: { position: 'start', formatter: 'Max' },
//                   type: 'max',
//                   name: 'Highest Point',
//                 },
//               ],
//             ],
//           },
//         },
//       ].filter(Boolean),
//     };

//     chart.setOption(options);

//     return () => {
//       chart.dispose();
//     };
//   }, [data, showMin, showMax, showInstant, finalDateType]);

//   return (
//     <div>
//       <h2>Gráfico de Temperatura de Bulbo Seco</h2>
//       <div ref={chartRef} style={{ width: '100%', height: '450px' }}></div>
//       <div>
//         <Button
//           type="primary"
//           style={{ backgroundColor: 'green', borderColor: 'green', marginLeft: '10px' }}
//           onClick={() => setShowMin(!showMin)}
//         >
//           {showMin ? 'Ocultar Temp. Mínima' : 'Mostrar Temp. Mínima'}
//         </Button>
//         <Button
//           type="primary"
//           style={{ backgroundColor: 'red', borderColor: 'red', marginLeft: '10px' }}
//           onClick={() => setShowMax(!showMax)}
//         >
//           {showMax ? 'Ocultar Temp. Máxima' : 'Mostrar Temp. Máxima'}
//         </Button>
//         <Button
//           type="primary"
//           style={{ backgroundColor: 'blue', borderColor: 'blue', marginLeft: '10px' }}
//           onClick={() => setShowInstant(!showInstant)}
//         >
//           {showInstant ? 'Ocultar Temp. Instantânea' : 'Mostrar Temp. Instantânea'}
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default DryBulbTempChart;

import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { Button } from 'antd';

const DryBulbTempChart = ({ data, finalDateType }) => {
  const chartRef = useRef();
  const [showMin, setShowMin] = useState(true);
  const [showMax, setShowMax] = useState(true);
  const [showInstant, setShowInstant] = useState(true);

  // useEffect(() => {
  //   if (!data || data.length === 0) return;

  //   const chart = echarts.init(chartRef.current);

  //   const xAxisData = finalDateType === 'dia'
  //     ? Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`)
  //     : Array.from({ length: 31 }, (_, i) => `Dia ${i + 1}`);

  //   const temperatures = data.flatMap(d => [
  //     d.tempBulboSeco,
  //     d.tempMax,
  //     d.tempMin,
  //   ]).filter(t => t !== null && !isNaN(t));

  //   const minTemp = Math.min(...temperatures) - 1;
  //   const maxTemp = Math.max(...temperatures) + 1;

  //   const seriesData = {
  //     instant: Array(xAxisData.length).fill(null),
  //     max: Array(xAxisData.length).fill(null),
  //     min: Array(xAxisData.length).fill(null),
  //   };

  //   data.forEach((d, index) => {
  //     const axisIndex = finalDateType === 'dia'
  //       ? parseInt(d.hora.slice(0, 2), 10)
  //       : parseInt(d.hora.split(' ')[1], 10) - 1;

  //     if (!isNaN(axisIndex) && axisIndex < xAxisData.length) {
  //       seriesData.instant[axisIndex] = d.tempBulboSeco || null;
  //       seriesData.max[axisIndex] = d.tempMax || null;
  //       seriesData.min[axisIndex] = d.tempMin || null;
  //     }
  //   });

  //   const options = {
      
  //     tooltip: {
  //       trigger: 'axis',
  //     },
  //     legend: {
  //       data: ['Temp. Instantânea', 'Temp. Máxima', 'Temp. Mínima'],
  //     },
  //     toolbox: {
  //       show: true,
  //       feature: {
  //         dataZoom: {
  //           yAxisIndex: 'none',
  //         },
  //         dataView: { readOnly: false },
  //         magicType: { type: ['line', 'bar'] },
  //         restore: {},
  //         saveAsImage: {},
  //       },
  //     },
  //     xAxis: {
  //       type: 'category',
  //       data: xAxisData,
  //     },
  //     yAxis: {
  //       type: 'value',
  //       axisLabel: {
  //         formatter: '{value} °C',
  //       },
  //       min: minTemp,
  //       max: maxTemp,
  //     },
  //     series: [
  //       showInstant && {
  //         name: 'Temp. Instantânea',
  //         type: 'line',
  //         data: seriesData.instant,
  //         smooth: true,
  //         lineStyle: { color: 'steelblue' },
  //         markPoint: {
  //           data: [
  //             { type: 'max', name: 'Max' },
  //             { type: 'min', name: 'Min' },
  //           ],
  //         },
  //         markLine: {
  //           data: [{ type: 'average', name: 'Avg' }],
  //         },
  //       },
  //       showMax && {
  //         name: 'Temp. Máxima',
  //         type: 'line',
  //         data: seriesData.max,
  //         smooth: true,
  //         lineStyle: { color: 'red' },
  //         markPoint: {
  //           data: [
  //             { type: 'max', name: 'Max' },
  //             { name: 'Critical Point', value: 30, xAxis: 2, yAxis: 30 },
  //           ],
  //         },
  //         markLine: {
  //           data: [{ type: 'average', name: 'Avg' }],
  //         },
  //       },
  //       showMin && {
  //         name: 'Temp. Mínima',
  //         type: 'line',
  //         data: seriesData.min,
  //         smooth: true,
  //         lineStyle: { color: 'green' },
  //         markPoint: {
  //           data: [{ name: 'Lowest', value: -10, xAxis: 1, yAxis: -10 }],
  //         },
  //         markLine: {
  //           data: [
  //             { type: 'average', name: 'Avg' },
  //             [
  //               { symbol: 'none', x: '90%', yAxis: 'max' },
  //               {
  //                 symbol: 'circle',
  //                 label: { position: 'start', formatter: 'Max' },
  //                 type: 'max',
  //                 name: 'Highest Point',
  //               },
  //             ],
  //           ],
  //         },
  //       },
  //     ].filter(Boolean),
  //   };

  //   chart.setOption(options);

  //   return () => {
  //     chart.dispose();
  //   };
  // }, [data, showMin, showMax, showInstant, finalDateType]);

  useEffect(() => {
    if (!data || data.length === 0) return;
  
    const chart = echarts.init(chartRef.current);
  
    const xAxisData = finalDateType === 'dia'
      ? Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`)
      : Array.from({ length: 31 }, (_, i) => `Dia ${i + 1}`);
  
    const temperatures = data.flatMap(d => [
      d.tempBulboSeco,
      d.tempMax,
      d.tempMin,
    ]).filter(t => t !== null && !isNaN(t));
  
    // Calcula os valores mínimo e máximo ajustados em 5%
    const minTempRaw = Math.min(...temperatures);
    const maxTempRaw = Math.max(...temperatures);
    const range = maxTempRaw - minTempRaw;
  
    const minTemp = minTempRaw - range * 0.1; // 5% abaixo do mínimo
    const maxTemp = maxTempRaw + range * 0.1; // 5% acima do máximo;
  
    const seriesData = {
      instant: Array(xAxisData.length).fill(null),
      max: Array(xAxisData.length).fill(null),
      min: Array(xAxisData.length).fill(null),
    };
  
    data.forEach((d) => {
      const axisIndex = finalDateType === 'dia'
        ? parseInt(d.hora.slice(0, 2), 10)
        : parseInt(d.hora.split(' ')[1], 10) - 1;
  
      if (!isNaN(axisIndex) && axisIndex < xAxisData.length) {
        seriesData.instant[axisIndex] = d.tempBulboSeco || null;
        seriesData.max[axisIndex] = d.tempMax || null;
        seriesData.min[axisIndex] = d.tempMin || null;
      }
    });
  
    const options = {
      tooltip: { trigger: 'axis' },
      legend: {
        data: ['Temp. Instantânea', 'Temp. Máxima', 'Temp. Mínima'],
      },
      toolbox: {
        show: true,
        feature: {
          dataZoom: { yAxisIndex: 'none' },
          dataView: { readOnly: false },
          magicType: { type: ['line', 'bar'] },
          restore: {},
          saveAsImage: {},
        },
      },
      xAxis: {
        type: 'category',
        data: xAxisData,
      },
      yAxis: {
        type: 'value',
        axisLabel: { formatter: '{value} °C' },
        min: minTemp,
        max: maxTemp,
      },
      series: [
        showInstant && {
          name: 'Temp. Instantânea',
          type: 'line',
          data: seriesData.instant,
          smooth: true,
          lineStyle: { color: 'steelblue' },
        },
        showMax && {
          name: 'Temp. Máxima',
          type: 'line',
          data: seriesData.max,
          smooth: true,
          lineStyle: { color: 'red' },
        },
        showMin && {
          name: 'Temp. Mínima',
          type: 'line',
          data: seriesData.min,
          smooth: true,
          lineStyle: { color: 'green' },
        },
      ].filter(Boolean),
    };
  
    chart.setOption(options);
  
    return () => {
      chart.dispose();
    };
  }, [data, showMin, showMax, showInstant, finalDateType]);
  

  return (
    <div>
      <h2>Gráfico de Temperatura de Bulbo Seco</h2>
      <div ref={chartRef} style={{ width: '120%', height: '600px' }}></div>
      <div>
        {/* <Button
          type="primary"
          style={{ backgroundColor: 'green', borderColor: 'green', marginLeft: '10px' }}
          onClick={() => setShowMin(!showMin)}
        >
          {showMin ? 'Ocultar Temp. Mínima' : 'Mostrar Temp. Mínima'}
        </Button>
        <Button
          type="primary"
          style={{ backgroundColor: 'red', borderColor: 'red', marginLeft: '10px' }}
          onClick={() => setShowMax(!showMax)}
        >
          {showMax ? 'Ocultar Temp. Máxima' : 'Mostrar Temp. Máxima'}
        </Button>
        <Button
          type="primary"
          style={{ backgroundColor: 'blue', borderColor: 'blue', marginLeft: '10px' }}
          onClick={() => setShowInstant(!showInstant)}
        >
          {showInstant ? 'Ocultar Temp. Instantânea' : 'Mostrar Temp. Instantânea'}
        </Button> */}
      </div>
    </div>
  );
};

export default DryBulbTempChart;

