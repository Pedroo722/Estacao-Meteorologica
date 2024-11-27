import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PluviosityChart = ({ data, finalDateType }) => {
  const chartRef = useRef();

  useEffect(() => {
    d3.select(chartRef.current).selectAll('*').remove();

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
    const xDomain = finalDateType === 'dia' ? data.map(d => d.hora) : Array.from({ length: 31 }, (_, i) => `Dia ${i + 1}`);
    const x = d3.scaleBand()
      .domain(xDomain)
      .range([0, width])
      .padding(0.1);

    const pluviosioties = data.flatMap(d => [
      d.precipitacaoTotal
    ]).filter(t => t !== null && !isNaN(t));

    const maxPluviosity = Math.max(...pluviosioties) + 1;

    const y = d3.scaleLinear()
      .domain([0, maxPluviosity])
      .nice()
      .range([height, 0]);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d => (finalDateType === 'dia' ? `${d.slice(0, 2)}:00` : d)));

    svg.append('g')
      .call(d3.axisLeft(y).ticks(6).tickFormat(d => `${d} mm`));

    const tempStep = maxPluviosity / 5;
    for (let pres = Math.ceil(0 / tempStep) * tempStep; pres <= maxPluviosity; pres += tempStep) {  // Limita até 5mm
      svg.append('line')
        .attr('x1', 0)
        .attr('x2', width)
        .attr('y1', y(pres))
        .attr('y2', y(pres))
        .attr('stroke', 'gray')
        .attr('stroke-dasharray', '5,5');
    }

    const chartData = finalDateType === 'dia'
      ? data
      : Array.from({ length: 31 }, (_, i) => ({
          precipitacaoTotal: d3.mean(data.filter(d => parseInt(d.hora.split(' ')[1]) - 1 === i).map(d => d.precipitacaoTotal)) || 0,
          label: `Dia ${i + 1}`
        }));

    svg.selectAll('.bar')
      .data(chartData)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(finalDateType === 'dia' ? d.hora : d.label))
      .attr('y', d => d.precipitacaoTotal > 0 ? y(d.precipitacaoTotal) : height) // Não desenha a barra se o valor for 0
      .attr('width', x.bandwidth())
      .attr('height', d => d.precipitacaoTotal > 0 ? height - y(d.precipitacaoTotal) : 0) // Não desenha a barra se o valor for 0
      .attr('fill', '#69b3a2')
      .on("click", function (event, d) {
        const alertMessage = finalDateType === 'dia'
          ? `Valor do Horário: ${d.precipitacaoTotal !== null ? d.precipitacaoTotal.toFixed(2) + ' mm' : 'Dado Ausente'}`
          : `Média Diária: ${d.precipitacaoTotal !== null ? d.precipitacaoTotal.toFixed(2) + ' mm' : 'Dado Ausente'}`;
        alert(alertMessage);
      });
  }, [data, finalDateType]);

  return (
    <div>
      <h3>Gráfico de Pluviosidade (Chuva em mm por {finalDateType === 'dia' ? 'Hora' : 'Dia'})</h3>
      <div ref={chartRef}></div>
    </div>
  );
};

export default PluviosityChart;
