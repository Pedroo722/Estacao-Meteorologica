import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Button } from 'antd';

const DewPointTempChart = ({ data }) => {
  const chartRef = useRef();
  const [showMin, setShowMin] = useState(true);
  const [showMax, setShowMax] = useState(true);
  const [showInstant, setShowInstant] = useState(true);

  useEffect(() => {
    if (!data || data.length === 0) return;

    // Limpar o gráfico existente no DOM
    d3.select(chartRef.current).selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const hourValues = Array.from({ length: 24 }, () => ({ instant: [], max: [], min: [] }));

    data.forEach(d => {
      const hourString = d.hora.replace(" UTC", ""); // "2300"
      const hour = parseInt(hourString.slice(0, 2), 10);
      
      // Adicionando valores às respectivas horas
      if (!isNaN(d.tempPontoOrvalho)) hourValues[hour].instant.push(d.tempPontoOrvalho);
      if (!isNaN(d.tempOrvalhoMax)) hourValues[hour].max.push(d.tempOrvalhoMax);
      if (!isNaN(d.tempOrvalhoMin)) hourValues[hour].min.push(d.tempOrvalhoMin);
    });

    const hourAverages = hourValues.map(values => ({
      instant: values.instant.length > 0 ? d3.mean(values.instant) : null,
      max: values.max.length > 0 ? d3.mean(values.max) : null,
      min: values.min.length > 0 ? d3.mean(values.min) : null,
    }));

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
      .domain([1, 23]) 
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, 45])
      .range([height, 0]);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(23).tickFormat(d => `${d.toString().padStart(2, '0')}:00`)); // Formata horas com dois dígitos

    svg.append('g')
      .call(d3.axisLeft(y).ticks(10).tickFormat(d => `${d.toFixed(1)} °C`));

    const drawLineAndPoints = (dataset, color, show) => {
      if (!show) return;

      const line = d3.line()
        .x((d, i) => x(i + 1)) // Adiciona 1 para alinhar com o eixo x de 1 a 23
        .y(d => (d !== null ? y(d) : height));

      svg.append("path")
        .datum(dataset)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 2)
        .attr("d", line);

      svg.selectAll(".dot-" + color)
        .data(dataset)
        .enter().append("circle")
        .attr("class", "dot-" + color)
        .attr("cx", (d, i) => x(i + 1)) 
        .attr("cy", d => (d !== null ? y(d) : height))
        .attr("r", 4)
        .attr("fill", color)
        .on("click", function (event, d) {
          alert(d !== null ? `Valor: ${d.toFixed(1)} °C` : 'Dado Ausente');
        });
    };

    // Desenhar linhas e pontos com base no estado atual
    drawLineAndPoints(hourAverages.map(d => d.min), 'green', showMin);
    drawLineAndPoints(hourAverages.map(d => d.max), 'red', showMax);
    drawLineAndPoints(hourAverages.map(d => d.instant), 'steelblue', showInstant);

  }, [data, showMin, showMax, showInstant]);

  return (
    <div>
      <h2>Gráfico de Ponto de Orvalho</h2>
      <div ref={chartRef}></div>
      <div>
        <Button 
          type="primary" 
          style={{ backgroundColor: 'green', borderColor: 'green', marginLeft: '10px' }} 
          onClick={() => setShowMin(!showMin)}>
          {showMin ? 'Ocultar Temp. Mínima' : 'Mostrar Temp. Mínima'}
        </Button>
        <Button 
          type="primary" 
          style={{ backgroundColor: 'red', borderColor: 'red', marginLeft: '10px' }} 
          onClick={() => setShowMax(!showMax)}>
          {showMax ? 'Ocultar Temp. Máxima' : 'Mostrar Temp. Máxima'}
        </Button>
        <Button 
          type="primary" 
          style={{ backgroundColor: 'blue', borderColor: 'blue', marginLeft: '10px' }} 
          onClick={() => setShowInstant(!showInstant)}>
          {showInstant ? 'Ocultar Temp. Instantânea' : 'Mostrar Temp. Instantânea'}
        </Button>
      </div>
    </div>
  );
};

export default DewPointTempChart;
