import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PluviosityChart = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    // Limpar gráfico no dom
    // para impedir instânciações repetidas no local
    d3.select(chartRef.current).selectAll('*').remove();

    // dimensões do gráfico
    const margin = { top: 20, right: 30, bottom: 40, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const parseTime = d3.timeParse("%Y-%m-%d %H:%M");

    const hourValues = Array.from({ length: 24 }, () => ({ chuva: [] }));

    data.forEach(d => {
      const time = parseTime(`${d.Data} ${d["Hora (UTC)"]}`);
      const hour = time.getUTCHours();
      if (!isNaN(d["Chuva (mm)"])) hourValues[hour].chuva.push(d["Chuva (mm)"]);
    });

    const hourAverages = hourValues.map(values => ({
      chuva: values.chuva.length > 0 ? d3.mean(values.chuva) : 0,
    }));

    // Definir escalas
    const x = d3.scaleBand()
      .domain(d3.range(24))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, 100])  
      .nice()
      .range([height, 0]);

    // eixos
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d => `${d}:00`));

    svg.append('g')
      .call(d3.axisLeft(y).ticks(10).tickFormat(d => `${d.toFixed(1)} mm`));

    // barras
    svg.selectAll('.bar')
      .data(hourAverages)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => x(i))
      .attr('y', d => y(d.chuva))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.chuva))
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
