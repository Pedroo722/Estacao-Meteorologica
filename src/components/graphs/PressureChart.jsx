import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { Button } from 'antd';

const PressureChart = ({ data, finalDateType }) => {
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

    const pressures = data.flatMap(d => [
      d.pressaoAtmosfericaMin,
      d.pressaoAtmosfericaMax,
      d.pressaoAtmosfericaNivelEstacao,
    ]).filter(value => value !== null && !isNaN(value));

    const minPresRaw = Math.min(...pressures);
    const maxPresRaw = Math.max(...pressures);
    const range = maxPresRaw - minPresRaw;
    const minPres = minPresRaw - range * 0.1;
    const maxPres = maxPresRaw + range * 0.1;

    const seriesData = {
      min: Array(xAxisData.length).fill(null),
      max: Array(xAxisData.length).fill(null),
      instant: Array(xAxisData.length).fill(null),
    };

    data.forEach(d => {
      const axisIndex =
        finalDateType === 'dia'
          ? parseInt(d.hora.slice(0, 2), 10)
          : parseInt(d.hora.split(' ')[1], 10) - 1;

      if (!isNaN(axisIndex) && axisIndex >= 0 && axisIndex < xAxisData.length) {
        if (!isNaN(d.pressaoAtmosfericaMin)) seriesData.min[axisIndex] = d.pressaoAtmosfericaMin;
        if (!isNaN(d.pressaoAtmosfericaMax)) seriesData.max[axisIndex] = d.pressaoAtmosfericaMax;
        if (!isNaN(d.pressaoAtmosfericaNivelEstacao)) seriesData.instant[axisIndex] = d.pressaoAtmosfericaNivelEstacao;
      }
    });

    const options = {
      tooltip: {
        trigger: 'axis',
        formatter: params => {
          return params.map(p => `${p.seriesName}: ${p.value !== null ? `${p.value} hPa` : 'Dado ausente'}`).join('<br>');
        },
      },
      legend: {
        data: ['Pressão Mínima', 'Pressão Máxima', 'Pressão Instantânea'],
      },
      toolbox: {
        show: true, // Ferramentas adicionais para o gráfico
        feature: {
          dataZoom: { yAxisIndex: 'none' }, // Zoom nos dados
          dataView: { readOnly: false },   // Visualização dos dados
          magicType: { type: ['line', 'bar'] }, // Alterar entre gráfico de linha e barras
          restore: {},                     // Restaurar o gráfico ao estado inicial
          saveAsImage: {},                 // Salvar como imagem
        },
      },
      xAxis: {
        type: 'category',
        data: xAxisData,
      },
      yAxis: {
        type: 'value',
        min: minPres,
        max: maxPres,
        axisLabel: {
          formatter: '{value} hPa',
        },
      },
      series: [
        {
          name: 'Pressão Mínima',
          type: 'line',
          data: seriesData.min,
          smooth: true,              // Linha suavizada
          lineStyle: { color: 'steelblue' },
        },
        {
          name: 'Pressão Máxima',
          type: 'line',
          data: seriesData.max,
          smooth: true,
          lineStyle: { color: 'red' },
        },
        {
          name: 'Pressão Instantânea',
          type: 'line',
          data: seriesData.instant,
          smooth: true,
          lineStyle: { color: 'green' },
        },
      ],
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
      <h2>Gráfico de Pressão Atmosférica</h2>
      <div ref={chartRef} style={{ width: '100%', height: '450px' }}></div>
     
    </div>
  );
};

export default PressureChart;
