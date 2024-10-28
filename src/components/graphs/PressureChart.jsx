import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { Button } from 'antd';

const PressureChart = ({ data }) => {
  const [showMin, setShowMin] = useState(true);
  const [showMax, setShowMax] = useState(true);
  const [showInstant, setShowInstant] = useState(true);

  useEffect(() => {
    if (!data || data.length === 0) return;

    // Limpar os gráficos existentes no DOM
    d3.select('#all-pressure-chart').selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const hourValues = Array.from({ length: 24 }, () => ({ instant: [], max: [], min: [] }));

    data.forEach(d => {      
      const hourString = d.hora.replace(" UTC", ""); // "2300"
      const hour = parseInt(hourString.slice(0, 2), 10);

      if (!isNaN(d.pressaoAtmosfericaNivelEstacao)) hourValues[hour].instant.push(d.pressaoAtmosfericaNivelEstacao);
      if (!isNaN(d.pressaoAtmosfericaMax)) hourValues[hour].max.push(d.pressaoAtmosfericaMax);
      if (!isNaN(d.pressaoAtmosfericaMin)) hourValues[hour].min.push(d.pressaoAtmosfericaMin);
    });

    const hourAverages = hourValues.map(values => ({
      instant: values.instant.length > 0 ? d3.mean(values.instant) : null,
      max: values.max.length > 0 ? d3.mean(values.max) : null,
      min: values.min.length > 0 ? d3.mean(values.min) : null,
    }));

    const svg = d3.select('#all-pressure-chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
      .domain([0, 23])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([d3.min(hourAverages.map(d => Math.min(d.min || Infinity, d.instant || Infinity, d.max || Infinity))) - 5,
               d3.max(hourAverages.map(d => Math.max(d.min || -Infinity, d.instant || -Infinity, d.max || -Infinity))) + 5])
      .range([height, 0]);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(24).tickFormat(d => `${d}:00`));

    svg.append('g')
      .call(d3.axisLeft(y).ticks(10).tickFormat(d => `${d.toFixed(1)} hPa`));

    const drawLineAndPoints = (dataset, color, show) => {
      if (!show) return;

      const line = d3.line()
        .x((d, i) => x(i))
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
        .attr("cx", (d, i) => x(i))
        .attr("cy", d => (d !== null ? y(d) : height))
        .attr("r", 4)
        .attr("fill", color)
        .on("click", function (event, d) {
          alert(d !== null ? `Valor: ${d.toFixed(1)} hPA` : 'Dado Ausente');
        });
    };

    // Desenhar linhas e pontos com base no estado atual
    drawLineAndPoints(hourAverages.map(d => d.min), 'green', showMin);
    drawLineAndPoints(hourAverages.map(d => d.max), 'red', showMax);
    drawLineAndPoints(hourAverages.map(d => d.instant), 'steelblue', showInstant);

  }, [data, showMin, showMax, showInstant]);

  return (
    <div>
      <h2>Gráfico de Pressão Atmosférica</h2>
      <div id="all-pressure-chart"></div>
      <div>
        <Button 
          type="primary" 
          style={{ backgroundColor: 'green', borderColor: 'green', marginLeft: '10px' }} 
          onClick={() => setShowMin(!showMin)}>
          {showMin ? 'Ocultar Pressão Mínima' : 'Mostrar Pressão Mínima'}
        </Button>
        <Button 
          type="primary" 
          style={{ backgroundColor: 'red', borderColor: 'red', marginLeft: '10px' }} 
          onClick={() => setShowMax(!showMax)}>
          {showMax ? 'Ocultar Pressão Máxima' : 'Mostrar Pressão Máxima'}
        </Button>
        <Button 
          type="primary" 
          style={{ backgroundColor: 'blue', borderColor: 'blue', marginLeft: '10px' }} 
          onClick={() => setShowInstant(!showInstant)}>
          {showInstant ? 'Ocultar Pressão Instantânea' : 'Mostrar Pressão Instantânea'}
        </Button>
      </div>
    </div>
  );
};

export default PressureChart;
