import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const PluviosityChart = ({ data, finalDateType }) => {
  const chartRef = useRef();
  const chartInstanceRef = useRef(null);// Referência ao gráfico para evitar inicializações duplicadas
  

  useEffect(() => {
    if (!chartInstanceRef.current) {
      chartInstanceRef.current = echarts.init(chartRef.current);
    }
    // Processar dados conforme o tipo de data
    const categories =
      finalDateType === 'dia'
        ? Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`) // 24 horas
        : Array.from({ length: 31 }, (_, i) => `Dia ${i + 1}`); // 31 dias

    const pluviosityData =
      finalDateType === 'dia'
        ? Array.from({ length: 24 }, (_, hour) => {
            const avgPrecipitation = data.filter(d => parseInt(d.hora.slice(0, 2), 10) === hour)
              .reduce((sum, d) => sum + (d.precipitacaoTotal || 0), 0) / 
              data.filter(d => parseInt(d.hora.slice(0, 2), 10) === hour).length || 0;
            return avgPrecipitation;
          })
        : Array.from({ length: 31 }, (_, day) => {
            const avgPrecipitation = data.filter(d => parseInt(d.hora.split(' ')[1], 10) - 1 === day)
              .reduce((sum, d) => sum + (d.precipitacaoTotal || 0), 0) /
              data.filter(d => parseInt(d.hora.split(' ')[1], 10) - 1 === day).length || 0;
            return avgPrecipitation;
          });

    const maxPluviosity = Math.max(...pluviosityData) + 1; // Adiciona 1 para garantir que o eixo Y tenha espaçamento adequado

    // Configuração do gráfico
    const options = {
      title: {
        text: `Gráfico de Pluviosidade (${finalDateType === 'dia' ? 'Hora' : 'Dia'})`,
        subtext: 'Valores de precipitação',
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params) => {
          const { data } = params[0];
          return finalDateType === 'dia'
            ? `Valor do Horário: ${data.toFixed(2)} mm`
            : `Média Diária: ${data.toFixed(2)} mm`;
        },
      },
      legend: {
        data: ['Pluviosidade'],
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
      xAxis: {
        type: 'category',
        data: categories,
        axisLabel: {
          rotate: finalDateType === 'dia' ? 45 : 0, // Ajusta o ângulo do texto
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} mm',
        },
        min: 0,
        max: maxPluviosity,
      },
      series: [
        {
          name: 'Pluviosidade',
          type: 'bar',
          data: pluviosityData,
          itemStyle: {
            color: '#69b3a2',
          },
          markLine: {
            data: [
              { type: 'average', name: 'Média' },
            ],
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
      <div ref={chartRef} style={containerStyle}></div>
    </div>
  );
};

export default PluviosityChart;
