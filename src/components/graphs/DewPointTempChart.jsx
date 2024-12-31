import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

const DewPointTempChart = ({ data, finalDateType }) => {
  const chartRef = useRef();
  const chartInstanceRef = useRef(null); // Referência ao gráfico para evitar inicializações duplicadas
  

  const [showMin, setShowMin] = useState(true);
  const [showMax, setShowMax] = useState(true);
  const [showInstant, setShowInstant] = useState(true);

  useEffect(() => {
    if (!data || data.length === 0) return;

    // Clear the existing chart

    if (!chartInstanceRef.current) {
      chartInstanceRef.current = echarts.init(chartRef.current);
    }

    const xAxisData = finalDateType === 'dia'
      ? Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`) // 24 horas
      : Array.from({ length: 31 }, (_, i) => `Dia ${i + 1}`); // 31 dias

    const temperatures = data.flatMap(d => [
            d.tempPontoOrvalho,
            d.tempOrvalhoMax,
            d.tempOrvalhoMin,
    ]).filter(t => t !== null && !isNaN(t));

    const minTempRaw = Math.min(...temperatures); // Menor temperatura
    const maxTempRaw = Math.max(...temperatures); // Maior temperatura
    const range = maxTempRaw - minTempRaw; // Intervalo de temperatura
    const minTemp = minTempRaw - range * 0.1; // Margem 10% abaixo
    const maxTemp = maxTempRaw + range * 0.1; // Margem 10% acima
    
    const seriesData = {
      instant: Array(xAxisData.length).fill(null), // Temperatura instantânea
      max: Array(xAxisData.length).fill(null),    // Temperatura máxima
      min: Array(xAxisData.length).fill(null),    // Temperatura mínima
    };

    data.forEach((d) => {
      const axisIndex = finalDateType === 'dia'
        ? parseInt(d.hora.slice(0, 2), 10) // Extrai a hora (para tipo "dia")
        : parseInt(d.hora.split(' ')[1], 10) - 1; // Extrai o dia (para tipo "mês")

      if (!isNaN(axisIndex) && axisIndex < xAxisData.length) {
        seriesData.instant[axisIndex] = d.tempPontoOrvalho || null; // Temperatura instantânea
        seriesData.max[axisIndex] = d.tempOrvalhoMax || null;           // Temperatura máxima
        seriesData.min[axisIndex] = d.tempOrvalhoMin || null;           // Temperatura mínima
      }
    });

    

    const options = {
      tooltip: { trigger: 'axis' }, // Exibe tooltip ao passar o mouse
      legend: {
        data: ['Temp. Instantânea', 'Temp. Máxima', 'Temp. Mínima'], // Legendas das séries
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
        type: 'category', // Eixo categórico
        data: xAxisData,  // Dados do eixo X (horas ou dias)
      },
      yAxis: {
        type: 'value', // Eixo numérico
        axisLabel: { formatter: '{value} °C' }, // Formato do rótulo
        min: minTemp, // Temperatura mínima ajustada
        max: maxTemp, // Temperatura máxima ajustada
      },
      series: [
        showInstant && {
          name: 'Temp. Instantânea', // Nome da série
          type: 'line',              // Tipo de gráfico: linha
          data: seriesData.instant,  // Dados da série
          smooth: true,              // Linha suavizada
          lineStyle: { color: 'steelblue' }, // Cor da linha
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
      ].filter(Boolean), // Remove séries nulas
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
      <h2>Gráfico de Temperatura de Ponto de Orvalho</h2>
      <div ref={chartRef} style={containerStyle}></div> {/* Elemento do gráfico */}
      
    </div>
  );
};

export default DewPointTempChart;
