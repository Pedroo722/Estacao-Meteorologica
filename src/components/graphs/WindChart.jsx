import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const WindChart = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    // Limpar gráfico anterior no DOM
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

    // Agrupar dados por hora
    const hourValues = Array.from({ length: 24 }, () => ({ velVento: [], rajVento: [] }));

    data.forEach(item => {
      // Remover " UTC" da string de hora
      const hourString = item.hora.replace(" UTC", ""); 

      // Extrair a hora
      const hour = parseInt(hourString.slice(0, 2), 10);

      // Adicionar os valores de vento nas horas correspondentes
      if (!isNaN(item.ventoVelocidade)) hourValues[hour].velVento.push(item.ventoVelocidade);
      if (!isNaN(item.ventoRajadaMax)) hourValues[hour].rajVento.push(item.ventoRajadaMax);
    });

    // Calcular a média dos valores de vento
    const hourAverages = hourValues.map(values => ({
      velVento: values.velVento.length > 0 ? d3.mean(values.velVento) : 0,
      rajVento: values.rajVento.length > 0 ? d3.mean(values.rajVento) : 0,
    }));

    // Definir escalas
    const x = d3.scaleBand()
      .domain(d3.range(24))
      .range([0, width])
      .padding(0.1);

    const yMax = Math.max(10, d3.max(hourAverages, d => Math.max(d.velVento, d.rajVento)));
    const y = d3.scaleLinear()
      .domain([0, yMax])
      .nice()
      .range([height, 0]);

    // Eixos
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d => `${d}:00`));

    svg.append('g')
      .call(d3.axisLeft(y).ticks(10).tickFormat(d => `${d.toFixed(1)} m/s`));

    // Barras para 'Vel. Vento' e 'Raj. Vento'
    svg.selectAll('.bar')
      .data(hourAverages)
      .enter().append('g')
      .attr('transform', (d, i) => `translate(${x(i)},0)`)
      .selectAll('rect')
      .data(d => [
        { key: 'Vel. Vento', value: d.velVento },
        { key: 'Raj. Vento', value: d.rajVento }
      ])
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => (i === 0 ? 0 : x.bandwidth() / 2))
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth() / 2)
      .attr('height', d => height - y(d.value))
      .attr('fill', d => (d.key === 'Vel. Vento' ? '#69b3a2' : '#ff7f0e'));

  }, [data]);

  return (
    <div>
      <h3>Gráfico de Velocidade e Rajada de Vento (m/s por Hora)</h3>
      <div ref={chartRef}></div>
    </div>
  );
};

export default WindChart;
