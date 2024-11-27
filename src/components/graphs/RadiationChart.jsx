import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const RadiationChart = ({ data, finalDateType }) => {
  const chartRef = useRef();

  useEffect(() => {
    // Limpar gráfico no DOM ao atualizar
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

    // Preparação dos dados para cada tipo de visualização
    const dataProcessed = finalDateType === 'dia'
      ? Array.from({ length: 24 }, (_, hour) => ({
          label: `${hour.toString().padStart(2, '0')}:00`,
          radiacao: d3.mean(data.filter(d => parseInt(d.hora.slice(0, 2), 10) === hour).map(d => parseFloat(d.radiacaoGlobal))) || 0,
        })).filter(d => d.radiacao > 0)
      : Array.from({ length: 31 }, (_, day) => ({
          label: `Dia ${day + 1}`,
          radiacao: d3.mean(data.filter(d => parseInt(d.hora.split(' ')[1], 10) - 1 === day).map(d => parseFloat(d.radiacaoGlobal))) || 0,
        })).filter(d => d.radiacao > 0);

    const x = d3.scaleBand()
      .domain(dataProcessed.map(d => d.label))
      .range([0, width])
      .padding(0.1);
    
    const y = d3.scaleLinear()
      .domain([0, Math.max(...data.map(d => parseFloat(d.radiacaoGlobal) || 0)) * 1.1])
      .nice()
      .range([height, 0]);

    // Eixos
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .call(d3.axisLeft(y).ticks(10).tickFormat(d => `${d} J/m²`));
    
    // linhas de referência
    const tempStep = 500;
    for (let radiacao = Math.ceil(0 / tempStep) * tempStep; radiacao <= Math.max(...data.map(d => parseFloat(d.radiacaoGlobal) || 0)) * 1.1; radiacao += tempStep) {
      svg.append('line')
        .attr('x1', 0)
        .attr('x2', width)
        .attr('y1', y(radiacao))
        .attr('y2', y(radiacao))
        .attr('stroke', 'gray')
        .attr('stroke-dasharray', '5,5');
    }

    // Barras com evento de clique para alerta
    svg.selectAll('.bar')
      .data(dataProcessed)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.label))
      .attr('y', d => y(d.radiacao))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.radiacao))
      .attr('fill', '#ffa500')
      .on("click", function (event, d) {
        const alertMessage = finalDateType === 'dia'
          ? `Valor da Radiação no Horário: ${d.radiacao !== null ? d.radiacao.toFixed(2) + ' J/m²' : 'Dado Ausente'}`
          : `Média Diária de Radiação: ${d.radiacao !== null ? d.radiacao.toFixed(2) + ' J/m²' : 'Dado Ausente'}`;
        alert(alertMessage);
      });

  }, [data, finalDateType]);

  return (
    <div>
      <h3>Gráfico de Radiação Solar (J/m² por {finalDateType === 'dia' ? 'Hora' : 'Dia'})</h3>
      <div ref={chartRef}></div>
    </div>
  );
};

export default RadiationChart;