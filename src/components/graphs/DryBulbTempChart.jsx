import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts'; // Biblioteca de gráficos

const DryBulbTempChart = ({ data, finalDateType, isMinimized }) => {
  const chartRef = useRef();
  const chartInstanceRef = useRef(null);// Referência ao gráfico para evitar inicializações duplicadas

  const [showMin, setShowMin] = useState(true);
  const [showMax, setShowMax] = useState(true);
  const [showInstant, setShowInstant] = useState(true);

  useEffect(() => {
    if (!data || data.length === 0 || !chartRef.current || chartRef.current.offsetWidth === 0 || chartRef.current.offsetHeight === 0) return;

    // Inicializa ou reutiliza a instância do gráfico
    if (!chartInstanceRef.current) {
      chartInstanceRef.current = echarts.init(chartRef.current);
    }

    const xAxisData =
      finalDateType === 'dia'
        ? Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`)
        : Array.from({ length: 31 }, (_, i) => `Dia ${i + 1}`);

    const temperatures = data
      .flatMap((d) => [d.tempBulboSeco, d.tempMax, d.tempMin])
      .filter((t) => t !== null && !isNaN(t));

    const minTempRaw = Math.min(...temperatures);
    const maxTempRaw = Math.max(...temperatures);
    const range = maxTempRaw - minTempRaw;
    const minTemp = minTempRaw - range * 0.1;
    const maxTemp = maxTempRaw + range * 0.1;

    const seriesData = {
      instant: Array(xAxisData.length).fill(null),
      max: Array(xAxisData.length).fill(null),
      min: Array(xAxisData.length).fill(null),
    };

    data.forEach((d) => {
      const axisIndex =
        finalDateType === 'dia'
          ? parseInt(d.hora.slice(0, 2), 10)
          : parseInt(d.hora.split(' ')[1], 10) - 1;

      if (!isNaN(axisIndex) && axisIndex < xAxisData.length) {
        seriesData.instant[axisIndex] = d.tempBulboSeco || null;
        seriesData.max[axisIndex] = d.tempMax || null;
        seriesData.min[axisIndex] = d.tempMin || null;
      }
    });

    const options = {
      
      tooltip: { trigger: 'axis' },
      legend: {
        data: ['Temp. Instantânea', 'Temp. Máxima', 'Temp. Mínima'],
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
        axisLabel: { formatter: '{value} °C' },
        min: minTemp,
        max: maxTemp,
      },
      series: [
        showInstant && {
          name: 'Temp. Instantânea',
          type: 'line',
          data: seriesData.instant,
          smooth: true,
          lineStyle: { color: 'steelblue' },
        },
        showMax && {
          name: 'Temp. Máxima',
          type: 'line',
          data: seriesData.max,
          smooth: true,
          lineStyle: { color: 'red' },
        },
        showMin && {
          name: 'Temp. Mínima',
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
      <h2>Gráfico de Temperatura de Bulbo Seco</h2>
      <div ref={chartRef} style={containerStyle}></div>
    </div>
  );
};

export default DryBulbTempChart;
