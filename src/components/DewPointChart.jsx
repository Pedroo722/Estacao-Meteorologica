import React, { useEffect } from 'react';
import * as d3 from 'd3';

const DewPointChart = ({ data }) => {
  useEffect(() => {
    if (!data || data.length === 0) return;

    // Limpar os gráficos existentes no dom
    // se não criará instância repetidas no local
    d3.select('#min-dew-chart').selectAll('*').remove();
    d3.select('#max-dew-chart').selectAll('*').remove();
    d3.select('#inst-dew-chart').selectAll('*').remove();
    d3.select('#all-dew-chart').selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const parseTime = d3.timeParse("%Y-%m-%d %H:%M");
    const hourValues = Array.from({ length: 24 }, () => ({ instant: [], max: [], min: [] }));

    data.forEach(d => {
      const time = parseTime(`${d.Data} ${d["Hora (UTC)"]}`);
      const hour = time.getUTCHours();
      if (!isNaN(d["Pto Orvalho Ins. (C)"])) hourValues[hour].instant.push(d["Pto Orvalho Ins. (C)"]);
      if (!isNaN(d["Pto Orvalho Max. (C)"])) hourValues[hour].max.push(d["Pto Orvalho Max. (C)"]);
      if (!isNaN(d["Pto Orvalho Min. (C)"])) hourValues[hour].min.push(d["Pto Orvalho Min. (C)"]);
    });

    const hourAverages = hourValues.map(values => ({
      instant: values.instant.length > 0 ? d3.mean(values.instant) : null,
      max: values.max.length > 0 ? d3.mean(values.max) : null,
      min: values.min.length > 0 ? d3.mean(values.min) : null,
    }));

    const createConnectedScatterplot = (selector, dataset, color, label) => {
      const svg = d3.select(selector)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const x = d3.scaleLinear()
        .domain([0, 23])
        .range([0, width]);

      const y = d3.scaleLinear()
        .domain([0, 45])
        .range([height, 0]);

      // Eixos
      svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x).ticks(24).tickFormat(d => `${d}:00`));

      svg.append('g')
        .call(d3.axisLeft(y).ticks(10).tickFormat(d => `${d.toFixed(1)} °C`));

      // Linha conectando os pontos
      const line = d3.line()
        .x((d, i) => x(i))
        .y(d => d !== null ? y(d) : height);

      svg.append("path")
        .datum(dataset)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 2)
        .attr("d", line);

      // pontos
      svg.selectAll(".dot")
        .data(dataset)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", (d, i) => x(i))
        .attr("cy", d => d !== null ? y(d) : height)
        .attr("r", 4)
        .attr("fill", color)
        .on("click", function (event, d) {
          alert(`Valor: ${d !== null ? d.toFixed(1) : 'N/A'} °C`);
        });
    };

    // Gráfico para a Ponto de Orvalho mínima
    createConnectedScatterplot('#min-dew-chart', hourAverages.map(d => d.min), 'green', 'Ponto de Orvalho Mínima');

    // Gráfico para a Ponto de Orvalho máxima
    createConnectedScatterplot('#max-dew-chart', hourAverages.map(d => d.max), 'red', 'Ponto de Orvalho Máxima');

    // Gráfico para a Ponto de Orvalho inst
    createConnectedScatterplot('#inst-dew-chart', hourAverages.map(d => d.instant), 'steelblue', 'Ponto de Orvalho Instante');

    // Gráfico com todas as séries
    const svgAll = d3.select('#all-dew-chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const xAll = d3.scaleLinear()
      .domain([0, 23])
      .range([0, width]);

    const yAll = d3.scaleLinear()
      .domain([0, 45])
      .range([height, 0]);

    // Eixos
    svgAll.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xAll).ticks(24).tickFormat(d => `${d}:00`));

    svgAll.append('g')
      .call(d3.axisLeft(yAll).ticks(10).tickFormat(d => `${d.toFixed(1)} °C`));

    const addLineAndDots = (dataset, color) => {
      const line = d3.line()
        .x((d, i) => xAll(i))
        .y(d => d !== null ? yAll(d) : height);

      // linhas
      svgAll.append("path")
        .datum(dataset)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 2)
        .attr("d", line);

      // pontos
      svgAll.selectAll(".dot")
        .data(dataset)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", (d, i) => xAll(i))
        .attr("cy", d => d !== null ? yAll(d) : height)
        .attr("r", 4)
        .attr("fill", color)
        .on("click", function (event, d) {
          alert(`Valor: ${d !== null ? d.toFixed(1) : 'N/A'} °C`);
        });
    };

    // Adiciona os pontos e linhas para cada série
    addLineAndDots(hourAverages.map(d => d.instant), 'steelblue');
    addLineAndDots(hourAverages.map(d => d.max), 'red');
    addLineAndDots(hourAverages.map(d => d.min), 'green');

    // Legenda
    const legend = svgAll.append('g')
      .attr('transform', `translate(${width - 120}, 10)`);

    legend.append('rect')
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', 'steelblue');
    legend.append('text')
      .attr('x', 15)
      .attr('y', 10)
      .text('Ponto de Orvalho Instante');

    legend.append('rect')
      .attr('y', 15)
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', 'red');
    legend.append('text')
      .attr('x', 15)
      .attr('y', 25)
      .text('Ponto de Orvalho Máxima');

    legend.append('rect')
      .attr('y', 30)
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', 'green');
    legend.append('text')
      .attr('x', 15)
      .attr('y', 40)
      .text('Ponto de Orvalho Mínima');

  }, [data]);

  return (
    <div>
      <h2>Gráficos de Ponto de Orvalho</h2>
      <div id="all-dew-chart"></div>
      <h3>Ponto de Orvalho Mínima</h3>
      <div id="min-dew-chart"></div>
      <h3>Ponto de Orvalho Máxima</h3>
      <div id="max-dew-chart"></div>
      <h3>Ponto de Orvalho Instante</h3>
      <div id="inst-dew-chart"></div>
    </div>
  );
};

export default DewPointChart;
