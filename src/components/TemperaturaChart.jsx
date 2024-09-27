import React, { useEffect } from 'react';
import * as d3 from 'd3';

const TemperatureChart = ({ data }) => {
  useEffect(() => {
    if (!data || data.length === 0) return;

    const margin = { top: 20, right: 30, bottom: 40, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select('#temperature-chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const parseTime = d3.timeParse("%Y-%m-%d %H:%M");
    const hourValues = Array.from({ length: 24 }, () => ({ instant: [], max: [], min: [] }));

    data.forEach(d => {
      const time = parseTime(`${d.Data} ${d["Hora (UTC)"]}`);
      const hour = time.getUTCHours();
      if (!isNaN(d["Temp. Ins. (C)"])) hourValues[hour].instant.push(d["Temp. Ins. (C)"]);
      if (!isNaN(d["Temp. Max. (C)"])) hourValues[hour].max.push(d["Temp. Max. (C)"]);
      if (!isNaN(d["Temp. Min. (C)"])) hourValues[hour].min.push(d["Temp. Min. (C)"]);
    });

    const hourAverages = hourValues.map(values => ({
      instant: values.instant.length > 0 ? d3.mean(values.instant) : null,
      max: values.max.length > 0 ? d3.mean(values.max) : null,
      min: values.min.length > 0 ? d3.mean(values.min) : null,
    }));

    const x0 = d3.scaleBand()
      .domain(d3.range(24).map(d => `${d}:00`))
      .range([0, width])
      .padding(0.1);

    const x1 = d3.scaleBand()
      .domain(['instant', 'max', 'min'])
      .range([0, x0.bandwidth()])
      .padding(0.05);

    const y = d3.scaleLinear()
      .domain([0, 45])
      .range([height, 0]);

    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x0));

    svg.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(y).ticks(10).tickFormat(d => `${d.toFixed(1)} °C`));

    svg.selectAll('.group')
      .data(hourAverages)
      .enter().append('g')
      .attr('class', 'group')
      .attr('transform', (d, i) => `translate(${x0(`${i}:00`)}, 0)`)
      .selectAll('rect')
      .data(d => [d.instant, d.max, d.min])
      .enter().append('rect')
      .attr('x', (d, i) => x1(['instant', 'max', 'min'][i]))
      .attr('y', d => d === null ? height : y(d))
      .attr('width', x1.bandwidth())
      .attr('height', d => d === null ? 0 : height - y(d))
      .attr('fill', (d, i) => (i === 0 ? 'steelblue' : i === 1 ? 'red' : 'green'));

    const legend = svg.append('g')
      .attr('transform', `translate(${width - 120}, 10)`);

    legend.append('rect')
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', 'steelblue');
    legend.append('text')
      .attr('x', 15)
      .attr('y', 10)
      .text('Temperatura Instante');

    legend.append('rect')
      .attr('y', 15)
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', 'red');
    legend.append('text')
      .attr('x', 15)
      .attr('y', 25)
      .text('Temperatura Máxima');

    legend.append('rect')
      .attr('y', 30)
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', 'green');
    legend.append('text')
      .attr('x', 15)
      .attr('y', 40)
      .text('Temperatura Mínima');

  }, [data]);

  return (
    <div>
      <h2>Gráfico de Temperaturas</h2>
      <div id="temperature-chart"></div>
    </div>
  );
};

export default TemperatureChart;