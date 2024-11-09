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

    const yMax = Math.max(10, d3.max(data, d => d.precipitacaoTotal));
    const y = d3.scaleLinear()
      .domain([0, yMax])
      .nice()
      .range([height, 0]);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d => (finalDateType === 'dia' ? `${d.slice(0, 2)}:00` : d)));

    svg.append('g')
      .call(d3.axisLeft(y).ticks(10).tickFormat(d => `${d.toFixed(1)} mm`));

    svg.selectAll('.bar')
      .data(finalDateType === 'dia' ? data.filter(d => d.precipitacaoTotal > 0) : 
            Array.from({ length: 31 }, (_, i) => ({
              precipitacaoTotal: d3.mean(data.filter(d => parseInt(d.hora.split(' ')[1]) - 1 === i).map(d => d.precipitacaoTotal)) || 0,
              label: `Dia ${i + 1}`
            })).filter(d => d.precipitacaoTotal > 0)
      )
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(finalDateType === 'dia' ? d.hora : d.label))
      .attr('y', d => y(d.precipitacaoTotal))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.precipitacaoTotal))
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
