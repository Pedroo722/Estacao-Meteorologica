import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const RadiationChart = ({ data, finalDateType }) => {
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
        : Array.from({ length: 31 }, (_, i) => `Dia ${i + 1}`); // 31 dias

    const radiation =
      finalDateType === 'dia'
        ? Array.from({ length: 24 }, (_, hour) => {
            const avgRadiation = data.filter(d => parseInt(d.hora.slice(0, 2), 10) === hour)
              .reduce((sum, d) => sum + parseFloat(d.radiacaoGlobal), 0) / 
              data.filter(d => parseInt(d.hora.slice(0, 2), 10) === hour).length || 0;
            return avgRadiation;
          })
        : Array.from({ length: 31 }, (_, day) => {
            const avgRadiation = data.filter(d => parseInt(d.hora.split(' ')[1], 10) - 1 === day)
              .reduce((sum, d) => sum + parseFloat(d.radiacaoGlobal), 0) /
              data.filter(d => parseInt(d.hora.split(' ')[1], 10) - 1 === day).length || 0;
            return avgRadiation;
          });

    // Configuração do gráfico
    const options = {
      title: {
        text: 'Radiação Solar',
        subtext: `Dados por ${finalDateType === 'dia' ? 'Hora' : 'Dia'}`,
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Radiação Solar'],
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
          axisLabel: {
            formatter: '{value} J/m²',
          },
        },
      ],
      series: [
        {
          name: 'Radiação Solar',
          type: 'bar',
          data: radiation,
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
      <h3>Gráfico de Radiação Solar</h3>
      <div ref={chartRef} style={{ width: '100%', height: '450px' }}></div>
    </div>
  );
};

export default RadiationChart;
