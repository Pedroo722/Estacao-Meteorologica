import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Button } from 'antd';

const PressureChart = ({ data, finalDateType }) => {
  const chartRef = useRef();
  const [showMin, setShowMin] = useState(true);
  const [showMax, setShowMax] = useState(true);
  const [showInstant, setShowInstant] = useState(true);

  useEffect(() => {
    if (!data || data.length === 0) return;

    // Limpar os gráficos existentes no DOM
    d3.select(chartRef.current).selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 60 };
    const width = 1000 - margin.left - margin.right;
    const height = 450 - margin.top - margin.bottom;

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
      .domain(finalDateType === 'dia' ? [1, 23] : [1, 31])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([d3.min(data.map(d => Math.min(d.pressaoAtmosfericaMin || Infinity, d.pressaoAtmosfericaMax || Infinity, d.pressaoAtmosfericaNivelEstacao || Infinity))) - 5,
               d3.max(data.map(d => Math.max(d.pressaoAtmosfericaMin || -Infinity, d.pressaoAtmosfericaMax || -Infinity, d.pressaoAtmosfericaNivelEstacao || -Infinity))) + 5])
      .range([height, 0]);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(finalDateType === 'dia' ? 23 : 31)
        .tickFormat(d => finalDateType === 'dia' ? `${d.toString().padStart(2, '0')}:00` : `Dia ${d}`));

    svg.append('g')
      .call(d3.axisLeft(y).ticks(10).tickFormat(d => `${d.toFixed(1)} hPa`));

    const drawLineAndPoints = (dataset, color, show) => {
      if (!show) return;

      const line = d3.line()
        .x((d, i) => x(i + 1))
        .y(d => (d !== null ? y(d) : height));

      svg.append("path")
        .datum(dataset)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 2)
        .attr("d", line);

      svg.selectAll(".dot-" + color)
        .data(dataset)
        .enter().append("circle")
        .attr("class", "dot-" + color)
        .attr("cx", (d, i) => x(i + 1))
        .attr("cy", d => (d !== null ? y(d) : height))
        .attr("r", 4)
        .attr("fill", color)
        .on("click", function (event, d) {
          const alertMessage = finalDateType === 'dia'
            ? `Valor do Horário: ${d !== null ? d.toFixed(1) + ' hPa' : 'Dado Ausente'}` 
            : `Média Diária: ${d !== null ? d.toFixed(1) + ' hPa' : 'Dado Ausente'}`;
          alert(alertMessage);
        });
    };

    let averagesAvailable = false;

    if (finalDateType === 'dia') {
      const hourValues = Array.from({ length: 24 }, () => ({ instant: [], max: [], min: [] }));

      data.forEach(d => {
        const hourString = d.hora.replace(" UTC", "");
        const hour = parseInt(hourString.slice(0, 2), 10);

        // Verifique se o hour está dentro do intervalo
        if (hour >= 0 && hour < 24) {
          if (!isNaN(d.pressaoAtmosfericaNivelEstacao)) hourValues[hour].instant.push(d.pressaoAtmosfericaNivelEstacao);
          if (!isNaN(d.pressaoAtmosfericaMax)) hourValues[hour].max.push(d.pressaoAtmosfericaMax);
          if (!isNaN(d.pressaoAtmosfericaMin)) hourValues[hour].min.push(d.pressaoAtmosfericaMin);
        }
      });

      const hourAverages = hourValues.map(values => ({
        instant: values.instant.length > 0 ? d3.mean(values.instant) : null,
        max: values.max.length > 0 ? d3.mean(values.max) : null,
        min: values.min.length > 0 ? d3.mean(values.min) : null,
      }));

      averagesAvailable = hourAverages.some(avg => avg.instant !== null || avg.max !== null || avg.min !== null);

      if (averagesAvailable) {
        drawLineAndPoints(hourAverages.map(d => d.min), 'green', showMin);
        drawLineAndPoints(hourAverages.map(d => d.max), 'red', showMax);
        drawLineAndPoints(hourAverages.map(d => d.instant), 'steelblue', showInstant);
      }
    } else {
      const dayValues = Array.from({ length: 31 }, () => ({ instant: [], max: [], min: [] }));

      data.forEach(d => {
        const dayString = d.hora;
        const day = parseInt(dayString.split(' ')[1], 10) - 1;

        // Verifique se o day está dentro do intervalo
        if (day >= 0 && day < 31) {
          if (!isNaN(d.pressaoAtmosfericaNivelEstacao)) dayValues[day].instant.push(d.pressaoAtmosfericaNivelEstacao);
          if (!isNaN(d.pressaoAtmosfericaMax)) dayValues[day].max.push(d.pressaoAtmosfericaMax);
          if (!isNaN(d.pressaoAtmosfericaMin)) dayValues[day].min.push(d.pressaoAtmosfericaMin);
        } else {
          console.warn(`Day ${day + 1} está fora do alcance do mês: ${dayString}`);
        }
      });

      const dayAverages = dayValues.map(values => ({
        instant: values.instant.length > 0 ? d3.mean(values.instant) : null,
        max: values.max.length > 0 ? d3.mean(values.max) : null,
        min: values.min.length > 0 ? d3.mean(values.min) : null,
      }));

      averagesAvailable = dayAverages.some(avg => avg.instant !== null || avg.max !== null || avg.min !== null);

      if (averagesAvailable) {
        drawLineAndPoints(dayAverages.map(d => d.min), 'green', showMin);
        drawLineAndPoints(dayAverages.map(d => d.max), 'red', showMax);
        drawLineAndPoints(dayAverages.map(d => d.instant), 'steelblue', showInstant);
      }
    }
  }, [data, showMin, showMax, showInstant, finalDateType]);

  return (
    <div>
      <h2>Gráfico de Pressão Atmosférica</h2>
      <div ref={chartRef}></div>
      <div>
        <Button
          type="primary"
          style={{ backgroundColor: 'green', borderColor: 'green', marginLeft: '10px' }} 
          onClick={() => setShowMin(!showMin)}>
          {showMin ? 'Ocultar Pressão Mínima' : 'Mostrar Pressão Mínima'}
        </Button>
        <Button
          type="primary"
          style={{ backgroundColor: 'red', borderColor: 'red', marginLeft: '10px' }} 
          onClick={() => setShowMax(!showMax)}>
          {showMax ? 'Ocultar Pressão Máxima' : 'Mostrar Pressão Máxima'}
        </Button>
        <Button
          type="primary"
          style={{ backgroundColor: 'blue', borderColor: 'blue', marginLeft: '10px' }} 
          onClick={() => setShowInstant(!showInstant)}>
          {showInstant ? 'Ocultar Pressão Instantânea' : 'Mostrar Pressão Instantânea'}
        </Button>
      </div>
    </div>
  );
};

export default PressureChart;