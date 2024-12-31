import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const WindChart = ({ data, finalDateType }) => {
  const chartRef = useRef();
    const chartInstanceRef = useRef(null);// Referência ao gráfico para evitar inicializações duplicadas
  

  useEffect(() => {
    if (!chartInstanceRef.current) {
      chartInstanceRef.current = echarts.init(chartRef.current);
    }

    // Processar os dados
    const categories =
      finalDateType === 'dia'
        ? Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`) // 24 horas
        : Array.from({ length: 12 }, (_, i) => `Mês ${i + 1}`); // 12 meses

    const windSpeed =
      finalDateType === 'dia'
        ? data.map(d => d.ventoVelocidade)
        : Array.from({ length: 12 }, (_, i) => {
            const filteredData = data.filter(d => d.mes === i + 1);
            const avgSpeed =
              filteredData.reduce((sum, item) => sum + item.ventoVelocidade, 0) /
              (filteredData.length || 1);
            return avgSpeed;
          });

    const windGust =
      finalDateType === 'dia'
        ? data.map(d => d.ventoRajadaMax)
        : Array.from({ length: 12 }, (_, i) => {
            const filteredData = data.filter(d => d.mes === i + 1);
            const avgGust =
              filteredData.reduce((sum, item) => sum + item.ventoRajadaMax, 0) /
              (filteredData.length || 1);
            return avgGust;
          });

    // Configuração do gráfico
    const options = {
      title: {
        text: 'Velocidade e Rajada do Vento',
        subtext: `Dados por ${finalDateType === 'dia' ? 'Hora' : 'Mês'}`,
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Velocidade do Vento', 'Rajada Máxima'],
      },
      toolbox: {
        show: true,
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          data: categories,
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: 'Velocidade do Vento',
          type: 'bar',
          data: windSpeed,
          markPoint: {
            data: [
              { type: 'max', name: 'Máximo' },
              { type: 'min', name: 'Mínimo' },
            ],
          },
          markLine: {
            data: [{ type: 'average', name: 'Média' }],
          },
        },
        {
          name: 'Rajada Máxima',
          type: 'bar',
          data: windGust,
          markPoint: {
            data: [
              { type: 'max', name: 'Máximo' },
              { type: 'min', name: 'Mínimo' },
            ],
          },
          markLine: {
            data: [{ type: 'average', name: 'Média' }],
          },
        },
      ],
    };

    setTimeout(() => {
      chartInstanceRef.current.setOption(options);
    }, 500); // Atraso de 300ms para permitir a visualização da animação inicial
  
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
  }, [data, finalDateType]);
  
    const containerStyle = {
      width: '100%',
      height: '70vh',
      alignSelf: 'center',
      transition: "1s ease"
    };
  
  return (
    <div>
      <h3>Gráfico de Velocidade e Rajada do Vento</h3>
      <div ref={chartRef} style={containerStyle}></div>
    </div>
  );
};

export default WindChart;
