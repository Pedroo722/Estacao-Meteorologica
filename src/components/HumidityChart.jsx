import React, { useEffect } from 'react';
import * as d3 from 'd3';

const HumidityChart = ({ data }) => {
  useEffect(() => {
    if (!data || data.length === 0) return;

    // Limpar os gráficos existentes no dom
    // se não criará instância repetidas no local
    d3.select('#min-umi-chart').selectAll('*').remove();
    d3.select('#max-umi-chart').selectAll('*').remove();
    d3.select('#inst-umi-chart').selectAll('*').remove();
    d3.select('#all-umi-chart').selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const parseTime = d3.timeParse("%Y-%m-%d %H:%M");
    const hourValues = Array.from({ length: 24 }, () => ({ instant: [], max: [], min: [] }));

    data.forEach(d => {
      const time = parseTime(`${d.Data} ${d["Hora (UTC)"]}`);
      const hour = time.getUTCHours();
      if (!isNaN(d["Umi. Ins. (%)"])) hourValues[hour].instant.push(d["Umi. Ins. (%)"]);
      if (!isNaN(d["Umi. Max. (%)"])) hourValues[hour].max.push(d["Umi. Max. (%)"]);
      if (!isNaN(d["Umi. Min. (%)"])) hourValues[hour].min.push(d["Umi. Min. (%)"]);
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
        .domain([0, 100]) 
        .range([height, 0]);

      // Eixos
      svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x).ticks(24).tickFormat(d => `${d}:00`));

      svg.append('g')
        .call(d3.axisLeft(y).ticks(10).tickFormat(d => `${d.toFixed(1)}%`));

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
          alert(`Valor: ${d !== null ? d.toFixed(1) : 'N/A'}%`);
        });
    };

    // Gráfico para a umidade mínima
    createConnectedScatterplot('#min-umi-chart', hourAverages.map(d => d.min), 'green', 'Umidade Mínima');

    // Gráfico para a umidade máxima
    createConnectedScatterplot('#max-umi-chart', hourAverages.map(d => d.max), 'red', 'Umidade Máxima');

    // Gráfico para a umidade instantânea
    createConnectedScatterplot('#inst-umi-chart', hourAverages.map(d => d.instant), 'steelblue', 'Umidade Instantânea');

    // Gráfico com todas as séries
    const svgAll = d3.select('#all-umi-chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const xAll = d3.scaleLinear()
      .domain([0, 23])
      .range([0, width]);

    const yAll = d3.scaleLinear()
      .domain([0, 100]) 
      .range([height, 0]);

    // Eixos
    svgAll.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xAll).ticks(24).tickFormat(d => `${d}:00`));

    svgAll.append('g')
      .call(d3.axisLeft(yAll).ticks(10).tickFormat(d => `${d.toFixed(1)}%`));

    const addLineAndDots = (dataset, color) => {
      const line = d3.line()
        .x((d, i) => xAll(i))
        .y(d => d !== null ? yAll(d) : height);

      // Adiciona as linhas
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
          alert(`Valor: ${d !== null ? d.toFixed(1) : 'N/A'}%`);
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
      .text('Umidade Instantânea');

    legend.append('rect')
      .attr('y', 15)
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', 'red');
    legend.append('text')
      .attr('x', 15)
      .attr('y', 25)
      .text('Umidade Máxima');

    legend.append('rect')
      .attr('y', 30)
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', 'green');
    legend.append('text')
      .attr('x', 15)
      .attr('y', 40)
      .text('Umidade Mínima');
  }, [data]);

  return (
    <div>
      <h2>Gráficos de Umidade</h2>
      <div id="all-umi-chart"></div>
      <h3>Umidade Mínima</h3>
      <div id="min-umi-chart"></div>
      <h3>Umidade Máxima</h3>
      <div id="max-umi-chart"></div>
      <h3>Umidade Instantânea</h3>
      <div id="inst-umi-chart"></div>
    </div>
  );
};

export default HumidityChart;
