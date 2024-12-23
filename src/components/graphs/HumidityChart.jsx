import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { Button } from 'antd';

const HumidityChart = ({ data, finalDateType }) => {
  const [showMin, setShowMin] = useState(true);
  const [showMax, setShowMax] = useState(true);
  const [showInstant, setShowInstant] = useState(true);

  useEffect(() => {
    if (!data || data.length === 0) return;
  
    // Limpar os gráficos existentes no DOM
    d3.select('#all-umi-chart').selectAll('*').remove();
  
    const margin = { top: 20, right: 30, bottom: 40, left: 60 };
    const width = 1200 - margin.left - margin.right;
    const height = 450 - margin.top - margin.bottom;
  
    const svg = d3.select('#all-umi-chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
  
    const x = d3.scaleLinear()
      .domain(finalDateType === 'dia' ? [0, 23] : [0, 30]) // Ajuste para dias
      .range([0, width]);
  
    const humidities = data.flatMap(d => [
      d.umidadeRelativa,
      d.umidadeRelativaMax,
      d.umidadeRelativaMin,
    ]).filter(value => value !== null && !isNaN(value));

    const minHumidity = Math.min(...humidities) * 0.95;
    const maxHumidity = Math.min((Math.max(...humidities) * 1.05), 100);
    
    const y = d3.scaleLinear()
      .domain([minHumidity, maxHumidity])
      .range([height, 0]);
  
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(finalDateType === 'dia' ? 24 : 31).tickFormat(d => finalDateType === 'dia' ? `${d}:00` : `Dia ${d + 1}`));
  
    svg.append('g')
      .call(d3.axisLeft(y).ticks(10).tickFormat(d => `${d.toFixed(1)}%`));
  
    const tempStep = 5;
    for (let temp = Math.ceil(0 / tempStep) * tempStep; temp <= 100; temp += tempStep) {
      svg.append('line')
        .attr('x1', 0)
        .attr('x2', width)
        .attr('y1', y(temp))
        .attr('y2', y(temp))
        .attr('stroke', 'gray')
        .attr('stroke-dasharray', '5,5')
    }

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
          alert(d !== null ? `Valor: ${d.toFixed(1)}%` : 'Dado Ausente');
        });
    };
  
    let averagesAvailable = false;
  
    if (finalDateType === 'dia') {
      const hourValues = Array.from({ length: 24 }, () => ({ instant: [], max: [], min: [] }));
  
      data.forEach(d => {
        const hourString = d.hora.replace(" UTC", ""); // "2300"
        const hour = parseInt(hourString.slice(0, 2), 10);
  
        if (hour >= 0 && hour < 24) {
          if (!isNaN(d.umidadeRelativa)) hourValues[hour].instant.push(d.umidadeRelativa);
          if (!isNaN(d.umidadeRelativaMax)) hourValues[hour].max.push(d.umidadeRelativaMax);
          if (!isNaN(d.umidadeRelativaMin)) hourValues[hour].min.push(d.umidadeRelativaMin);
        }
      });
  
      const hourAverages = hourValues.map(values => ({
        instant: values.instant.length > 0 ? d3.mean(values.instant) : null,
        max: values.max.length > 0 ? d3.mean(values.max) : null,
        min: values.min.length > 0 ? d3.mean(values.min) : null,
      }));
  
      averagesAvailable = hourAverages.some(avg => avg.instant !== null || avg.max !== null || avg.min !== null);
  
      if (averagesAvailable) {
        drawLineAndPoints(hourAverages.map(d => d.min), 'green', showMin);
        drawLineAndPoints(hourAverages.map(d => d.max), 'red', showMax);
        drawLineAndPoints(hourAverages.map(d => d.instant), 'steelblue', showInstant);
      }
    } else {
      const dayValues = Array.from({ length: 31 }, () => ({ instant: [], max: [], min: [] }));
  
      data.forEach(d => {
        const dayString = d.hora.split(' ')[1]; // "15" do "2024-11-15"
        const day = parseInt(dayString, 10) - 1;
  
        if (day >= 0 && day < 31) {
          if (!isNaN(d.umidadeRelativa)) dayValues[day].instant.push(d.umidadeRelativa);
          if (!isNaN(d.umidadeRelativaMax)) dayValues[day].max.push(d.umidadeRelativaMax);
          if (!isNaN(d.umidadeRelativaMin)) dayValues[day].min.push(d.umidadeRelativaMin);
        }
      });
  
      const dayAverages = dayValues.map(values => ({
        instant: values.instant.length > 0 ? d3.mean(values.instant) : null,
        max: values.max.length > 0 ? d3.mean(values.max) : null,
        min: values.min.length > 0 ? d3.mean(values.min) : null,
      }));
  
      averagesAvailable = dayAverages.some(avg => avg.instant !== null || avg.max !== null || avg.min !== null);
  
      if (averagesAvailable) {
        drawLineAndPoints(dayAverages.map(d => d.min), 'green', showMin);
        drawLineAndPoints(dayAverages.map(d => d.max), 'red', showMax);
        drawLineAndPoints(dayAverages.map(d => d.instant), 'steelblue', showInstant);
      }
    }
  }, [data, showMin, showMax, showInstant, finalDateType]);

  return (
    <div>
      <h2>Gráfico de Umidade Relativa</h2>
      <div id="all-umi-chart"></div>
      <div>
        <Button
          type="primary"
          style={{ backgroundColor: 'green', borderColor: 'green', marginLeft: '10px' }} 
          onClick={() => setShowMin(!showMin)}>
          {showMin ? 'Ocultar Umidade Mínima' : 'Mostrar Umidade Mínima'}
        </Button>
        <Button
          type="primary"
          style={{ backgroundColor: 'red', borderColor: 'red', marginLeft: '10px' }} 
          onClick={() => setShowMax(!showMax)}>
          {showMax ? 'Ocultar Umidade Máxima' : 'Mostrar Umidade Máxima'}
        </Button>
        <Button
          type="primary"
          style={{ backgroundColor: 'blue', borderColor: 'blue', marginLeft: '10px' }} 
          onClick={() => setShowInstant(!showInstant)}>
          {showInstant ? 'Ocultar Umidade Instantânea' : 'Mostrar Umidade Instantânea'}
        </Button>
      </div>
    </div>
  );
};

export default HumidityChart;