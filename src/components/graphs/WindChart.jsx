import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const WindChart = ({ data, finalDateType }) => {
  const chartRef = useRef();

  useEffect(() => {
    // Limpar gráfico anterior no DOM
    d3.select(chartRef.current).selectAll('*').remove();

    // Dimensões do gráfico
    const margin = { top: 20, right: 30, bottom: 40, left: 60 };
    const width = 1200 - margin.left - margin.right;
    const height = 450 - margin.top - margin.bottom;

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Escala X para dias ou horas, dependendo do `finalDateType`
    const xDomain = finalDateType === 'dia' 
      ? data.map(d => d.hora) 
      : Array.from({ length: 31 }, (_, i) => `Dia ${i + 1}`);
    const x = d3.scaleBand()
      .domain(xDomain)
      .range([0, width])
      .padding(0.1);

    // Calcular o valor máximo para o eixo Y
    const yMax = Math.max(10, d3.max(data, d => Math.max(d.ventoVelocidade, d.ventoRajadaMax)));
    const y = d3.scaleLinear()
      .domain([0, yMax])
      .nice()
      .range([height, 0]);

    // Eixo X
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d => (finalDateType === 'dia' ? `${d.slice(0, 2)}:00` : d)));

    // Eixo Y
    svg.append('g')
      .call(d3.axisLeft(y).ticks(10).tickFormat(d => `${d.toFixed(1)} m/s`));

    // Dados para o gráfico, filtrados por hora ou média diária
    const chartData = finalDateType === 'dia' 
      ? data.filter(d => d.ventoVelocidade > 0 || d.ventoRajadaMax > 0)
      : Array.from({ length: 31 }, (_, i) => ({
          ventoVelocidade: d3.mean(data.filter(d => parseInt(d.hora.split(' ')[1]) - 1 === i).map(d => d.ventoVelocidade)) || 0,
          ventoRajadaMax: d3.mean(data.filter(d => parseInt(d.hora.split(' ')[1]) - 1 === i).map(d => d.ventoRajadaMax)) || 0,
          label: `Dia ${i + 1}`
        })).filter(d => d.ventoVelocidade > 0 || d.ventoRajadaMax > 0);

    // Barras de 'Vel. Vento' e 'Raj. Vento'
    svg.selectAll('.bar-group')
      .data(chartData)
      .enter().append('g')
      .attr('transform', d => `translate(${x(finalDateType === 'dia' ? d.hora : d.label)},0)`)
      .selectAll('rect')
      .data(d => [
        { key: 'Vel. Vento', value: d.ventoVelocidade },
        { key: 'Raj. Vento', value: d.ventoRajadaMax }
      ])
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => (i === 0 ? 0 : x.bandwidth() / 2))
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth() / 2)
      .attr('height', d => height - y(d.value))
      .attr('fill', d => (d.key === 'Vel. Vento' ? '#69b3a2' : '#ff7f0e'))
      .on("click", function (event, d) {
        const alertMessage = finalDateType === 'dia'
          ? `${d.key}: ${d.value !== null ? d.value.toFixed(2) + ' m/s' : 'Dado Ausente'}`
          : `Média Diária ${d.key}: ${d.value !== null ? d.value.toFixed(2) + ' m/s' : 'Dado Ausente'}`;
        alert(alertMessage);
      });
  }, [data, finalDateType]);

  return (
    <div>
      <h3>Gráfico de Velocidade e Rajada de Vento (m/s por {finalDateType === 'dia' ? 'Hora' : 'Dia'})</h3>
      <div ref={chartRef}></div>
    </div>
  );
};

export default WindChart;