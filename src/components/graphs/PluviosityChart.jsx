import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PluviosityChart = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    // Limpar gráfico no DOM
    d3.select(chartRef.current).selectAll('*').remove();

    // Dimensões do gráfico
    const margin = { top: 20, right: 30, bottom: 40, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Definir escalas
    const x = d3.scaleBand()
      .domain(data.map(d => d.hora))
      .range([0, width])
      .padding(0.1);

    const yMax = Math.max(10, d3.max(data, d => d.precipitacaoTotal));

    const y = d3.scaleLinear()
      .domain([0, yMax])
      .nice()
      .range([height, 0]);

    // Eixos
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d => `${d.slice(0, 2)}:00`));

    svg.append('g')
      .call(d3.axisLeft(y).ticks(10).tickFormat(d => `${d.toFixed(1)} mm`));

    // Barras
    svg.selectAll('.bar')
      .data(data.filter(d => d.precipitacaoTotal > 0)) // Filtrar apenas os dados com precipitação maior que 0
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.hora))
      .attr('y', d => y(d.precipitacaoTotal))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.precipitacaoTotal))
      .attr('fill', '#69b3a2');

  }, [data]);

  return (
    <div>
      <h3>Gráfico de Pluviosidade (Chuva em mm por Hora)</h3>
      <div ref={chartRef}></div>
    </div>
  );
};

export default PluviosityChart;