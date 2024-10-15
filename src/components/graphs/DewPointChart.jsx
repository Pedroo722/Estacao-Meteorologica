import React, { useEffect } from 'react';
import * as d3 from 'd3';

const DewPointChart = ({ data }) => {
  useEffect(() => {
    if (!data || data.length === 0) return;

    // Limpar os gráficos existentes no DOM
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
      // Remover " UTC" da string de hora, se presente
      const hourString = d.hora.replace(" UTC", ""); // "2300"
      
      // Extrair a hora e os minutos
      const hour = parseInt(hourString.slice(0, 2), 10); // Obtém a hora como um número
      const minutes = hourString.slice(2); // Obtém os minutos como string
      
      // Montar a string de data e hora
      const timeString = `${d.data} ${hourString.slice(0, 2)}:${minutes}`; // "YYYY-MM-DD HH:MM"
      const time = parseTime(timeString);
    
      // Verifica se o tempo é válido
      if (!time) {
        console.warn(`Data inválida: ${timeString}`);
        return;
      }
    
      // Aqui você deve usar as chaves corretas
      if (!isNaN(d.tempPontoOrvalho)) hourValues[hour].instant.push(d.tempPontoOrvalho);
      if (!isNaN(d.tempOrvalhoMax)) hourValues[hour].max.push(d.tempOrvalhoMax);
      if (!isNaN(d.tempOrvalhoMin)) hourValues[hour].min.push(d.tempOrvalhoMin);
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
        .y(d => (d !== null ? y(d) : height));

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
        .attr("cy", d => (d !== null ? y(d) : height))
        .attr("r", 4)
        .attr("fill", color)
        .on("click", function (event, d) {
          alert(`Valor: ${d !== null ? d.toFixed(1) : 'N/A'} °C`); // O valor é exibido corretamente
        });
    };

    // Gráfico para o Ponto de Orvalho Mínima
    createConnectedScatterplot('#min-dew-chart', hourAverages.map(d => d.min), 'green', 'Ponto de Orvalho Mínima');

    // Gráfico para o Ponto de Orvalho Máxima
    createConnectedScatterplot('#max-dew-chart', hourAverages.map(d => d.max), 'red', 'Ponto de Orvalho Máxima');

    // Gráfico para o Ponto de Orvalho Instante
    createConnectedScatterplot('#inst-dew-chart', hourAverages.map(d => d.instant), 'steelblue', 'Ponto de Orvalho Instante');
  }, [data]);

  return (
    <div>
      <h2>Gráficos de Ponto de Orvalho</h2>
      <div id="min-dew-chart"></div>
      <div id="max-dew-chart"></div>
      <div id="inst-dew-chart"></div>
      <div id="all-dew-chart"></div>
    </div>
  );
};

export default DewPointChart;
