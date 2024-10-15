import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const RadiationChart = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    // Limpar gráfico no DOM ao atualizar
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

    const parseTime = d3.timeParse("%Y-%m-%d %H:%M");

    const hourValues = Array.from({ length: 24 }, () => ({ radiacao: [] }));

    data.forEach(item => {
      const hourString = item.hora.replace(" UTC", ""); 

      const hour = parseInt(hourString.slice(0, 2), 10); 
      const minutes = hourString.slice(2);

      const timeString = `${item.data} ${hourString.slice(0, 2)}:${minutes}`;
      const time = parseTime(timeString);

      if (!time) {
        console.warn(`Data inválida: ${timeString}`);
        return;
      }

      if (!isNaN(item.radiacaoGlobal)) hourValues[hour].radiacao.push(item.radiacaoGlobal);
    });

    const hourAverages = hourValues.map(values => ({
      radiacao: values.radiacao.length > 0 ? d3.mean(values.radiacao) : 0,
    }));

    const x = d3.scaleBand()
      .domain(d3.range(24))
      .range([0, width])
      .padding(0.1);

    // A radiação varia de 0 a 6.000 J/m²
    const yMax = 6000;

    const y = d3.scaleLinear()
      .domain([0, yMax])
      .nice()
      .range([height, 0]);

    // Eixos
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d => `${d}:00`));

    svg.append('g')
      .call(d3.axisLeft(y).ticks(10).tickFormat(d => `${d} J/m²`));

    // Barras
    svg.selectAll('.bar')
      .data(hourAverages)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => x(i))
      .attr('y', d => d.radiacao > 0 ? y(d.radiacao) : height) // n exibe barra se radiação = 0
      .attr('width', x.bandwidth())
      .attr('height', d => d.radiacao > 0 ? height - y(d.radiacao) : 0)
      .attr('fill', '#ffa500'); 

  }, [data]);

  return (
    <div>
      <h3>Gráfico de Radiação Solar (J/m² por Hora)</h3>
      <div ref={chartRef}></div>
    </div>
  );
};

export default RadiationChart;
