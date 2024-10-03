import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const WindChart = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    // Limpar gráfico anterior no dom
    // para impedir instâncias repetidas no local  
    d3.select(chartRef.current).selectAll('*').remove();

    // dimensões do gráfico
    const margin = { top: 20, right: 30, bottom: 40, left: 60 };
    const width = 1000 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const parseTime = d3.timeParse("%Y-%m-%d %H:%M");

    const hourValues = Array.from({ length: 24 }, () => ({ velVento: [], rajVento: [] }));

    data.forEach(d => {
      const time = parseTime(`${d.Data} ${d["Hora (UTC)"]}`);
      const hour = time.getUTCHours();
      if (!isNaN(d["Vel. Vento (m/s)"])) hourValues[hour].velVento.push(d["Vel. Vento (m/s)"]);
      if (!isNaN(d["Raj. Vento (m/s)"])) hourValues[hour].rajVento.push(d["Raj. Vento (m/s)"]);
    });

    const hourAverages = hourValues.map(values => ({
      velVento: values.velVento.length > 0 ? d3.mean(values.velVento) : 0,
      rajVento: values.rajVento.length > 0 ? d3.mean(values.rajVento) : 0,
    }));

    // Definir escalas
    const x0 = d3.scaleBand()
      .domain(d3.range(24))
      .range([0, width])
      .padding(0.2);

    const x1 = d3.scaleBand()
      .domain(['Vel. Vento', 'Raj. Vento'])
      .range([0, x0.bandwidth()])
      .padding(0.05);

    const y = d3.scaleLinear()
      .domain([0, d3.max(hourAverages, d => Math.max(d.velVento, d.rajVento))])
      .nice()
      .range([height, 0]);

    // eixos
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x0).tickFormat(d => `${d}:00`));

    svg.append('g')
      .call(d3.axisLeft(y).ticks(10).tickFormat(d => `${d.toFixed(1)} m/s`));

    // barras para 'Vel. Vento' e 'Raj. Vento'
    svg.append('g')
      .selectAll('g')
      .data(hourAverages)
      .enter().append('g')
      .attr('transform', (d, i) => `translate(${x0(i)},0)`)
      .selectAll('rect')
      .data(d => [
        { key: 'Vel. Vento', value: d.velVento },
        { key: 'Raj. Vento', value: d.rajVento }
      ])
      .enter().append('rect')
      .attr('x', d => x1(d.key))
      .attr('y', d => y(d.value))
      .attr('width', x1.bandwidth())
      .attr('height', d => height - y(d.value))
      .attr('fill', d => d.key === 'Vel. Vento' ? '#69b3a2' : '#ff7f0e');

    // Legenda
    svg.append('g')
      .attr('transform', `translate(${width - 120}, 10)`)
      .selectAll('legend')
      .data(['Vel. Vento', 'Raj. Vento'])
      .enter()
      .append('g')
      .attr('class', 'legend');

    const legend = svg.selectAll('.legend');
    
    legend.append('rect')
      .attr('x', 0)
      .attr('y', (d, i) => i * 20)
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', d => d === 'Vel. Vento' ? '#69b3a2' : '#ff7f0e');

    legend.append('text')
      .attr('x', 15)
      .attr('y', (d, i) => i * 20 + 9)
      .text(d => d);

  }, [data]);

  return (
    <div>
      <h3>Gráfico de Velocidade e Rajada de Vento (m/s por Hora)</h3>
      <div ref={chartRef}></div>
    </div>
  );
};

export default WindChart;
