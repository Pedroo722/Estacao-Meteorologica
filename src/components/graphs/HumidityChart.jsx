import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

const HumidityChart = ({ data, finalDateType }) => {
  const chartRef = useRef();
  const chartInstanceRef = useRef(null); // Referência ao gráfico para evitar inicializações duplicadas

  const [showMin, setShowMin] = useState(true);
  const [showMax, setShowMax] = useState(true);
  const [showInstant, setShowInstant] = useState(true);

  useEffect(() => {
    if (!data || data.length === 0) return;

    if (!chartInstanceRef.current) {
      chartInstanceRef.current = echarts.init(chartRef.current);
    }

    const xAxisData =
      finalDateType === 'dia'
        ? Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`)
        : Array.from({ length: 31 }, (_, i) => `Dia ${i + 1}`);

    const humidities = data.flatMap(d => [
      d.umidadeRelativa,
      d.umidadeRelativaMax,
      d.umidadeRelativaMin,
    ]).filter(value => value !== null && !isNaN(value));

    const minHumidity = Math.max(0, Math.min(...humidities) * 0.95);
    const maxHumidity = Math.min(100, Math.max(...humidities) * 1.05);

    const seriesData = {
      instant: Array(xAxisData.length).fill(null),
      max: Array(xAxisData.length).fill(null),
      min: Array(xAxisData.length).fill(null),
    };

    data.forEach(d => {
      const axisIndex =
        finalDateType === 'dia'
          ? parseInt(d.hora.slice(0, 2), 10)
          : parseInt(d.hora.split(' ')[1], 10) - 1;

      if (!isNaN(axisIndex) && axisIndex < xAxisData.length) {
        seriesData.instant[axisIndex] = d.umidadeRelativa || null;
        seriesData.max[axisIndex] = d.umidadeRelativaMax || null;
        seriesData.min[axisIndex] = d.umidadeRelativaMin || null;
      }
    });

    const options = {
      tooltip: { trigger: 'axis' },
      legend: {
        data: ['Umidade Instantânea', 'Umidade Máxima', 'Umidade Mínima'],
      },
      toolbox: {
        show: true,
        feature: {
          dataZoom: { yAxisIndex: 'none' },
          dataView: { readOnly: false },
          magicType: { type: ['line', 'bar'] },
          restore: {},
          saveAsImage: {},
        },
      },
      xAxis: {
        type: 'category',
        data: xAxisData,
      },
      yAxis: {
        type: 'value',
        axisLabel: { formatter: '{value}%' },
        min: minHumidity,
        max: maxHumidity,
      },
      series: [
        showInstant && {
          name: 'Umidade Instantânea',
          type: 'line',
          data: seriesData.instant,
          smooth: true,
          lineStyle: { color: 'blue' },
        },
        showMax && {
          name: 'Umidade Máxima',
          type: 'line',
          data: seriesData.max,
          smooth: true,
          lineStyle: { color: 'red' },
        },
        showMin && {
          name: 'Umidade Mínima',
          type: 'line',
          data: seriesData.min,
          smooth: true,
          lineStyle: { color: 'green' },
        },
      ].filter(Boolean),
    };

    setTimeout(() => {
      chartInstanceRef.current.setOption(options);
    }, 300); // Atraso de 300ms para permitir a visualização da animação inicial
  
    let resizeTimeout;
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        chartInstanceRef.current?.resize();
      }, 0); // Debounce de 100ms
    });
  
    resizeObserver.observe(chartRef.current);
  
    return () => {
      clearTimeout(resizeTimeout);
      resizeObserver.disconnect();
      chartInstanceRef.current?.dispose();
      chartInstanceRef.current = null;
    };
  }, [data, showMin, showMax, showInstant, finalDateType]);
  
    const containerStyle = {
      width: '100%',
      height: '70vh',
      alignSelf: 'center',
      transition: "1s ease"
    };
  return (
    <div>
      <h2>Gráfico de Umidade Relativa</h2>
      <div ref={chartRef} style={containerStyle}></div>
    </div>
  );
};

export default HumidityChart;
