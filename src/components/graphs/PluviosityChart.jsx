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

    const parseTime = d3.timeParse("%Y-%m-%d %H:%M");

    const hourValues = Array.from({ length: 24 }, () => ({ chuva: [] }));

    data.forEach(item => {
      // Remover " UTC" da string de hora
      const hourString = item.hora.replace(" UTC", ""); 

      // Extrair a hora e os minutos
      const hour = parseInt(hourString.slice(0, 2), 10); // Obtém a hora como um número
      const minutes = hourString.slice(2); // Obtém os minutos como string

      // Montar a string de data e hora
      const timeString = `${item.data} ${hourString.slice(0, 2)}:${minutes}`; // "YYYY-MM-DD HH:MM"
      const time = parseTime(timeString);

      if (!time) {
        console.warn(`Data inválida: ${timeString}`);
        return;
      }

      if (!isNaN(item.chuva)) hourValues[hour].chuva.push(item.chuva);
    });

    const hourAverages = hourValues.map(values => ({
      chuva: values.chuva.length > 0 ? d3.mean(values.chuva) : 0,
    }));

    // Definir escalas
    const x = d3.scaleBand()
      .domain(d3.range(24))
      .range([0, width])
      .padding(0.1);

    // Define o valor máximo do eixo Y como o máximo entre 10 mm e o valor máximo dos dados
    const maxChuva = d3.max(hourAverages, d => d.chuva);
    const yMax = Math.max(10, maxChuva);

    const y = d3.scaleLinear()
      .domain([0, yMax]) // Definindo o domínio do eixo Y
      .nice()
      .range([height, 0]);

    // Eixos
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d => `${d}:00`));

    svg.append('g')
      .call(d3.axisLeft(y).ticks(10).tickFormat(d => `${d.toFixed(1)} mm`));

    // Barras
    svg.selectAll('.bar')
      .data(hourAverages)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => x(i))
      .attr('y', d => d.chuva > 0 ? y(d.chuva) : height) // Exibe a barra apenas se chuva > 0
      .attr('width', x.bandwidth())
      .attr('height', d => d.chuva > 0 ? height - y(d.chuva) : 0) 
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
