import React, { useState } from 'react';
import { Button, DatePicker, Table, Tabs, Select } from 'antd'; 
import dayjs from 'dayjs';
import axios from 'axios';
import '../styles/Graphs.css';
import DryBulbTempChart from '../components/graphs/DryBulbTempChart';
import HumidityChart from '../components/graphs/HumidityChart';
import DewPointTempChart from '../components/graphs/DewPointTempChart';
import PluviosityChart from '../components/graphs/PluviosityChart';
import WindChart from '../components/graphs/WindChart';
import PressureChart from '../components/graphs/PressureChart';
import RadiationChart from '../components/graphs/RadiationChart';
import { baseUrlWeatherData } from "../util/constants";

const { MonthPicker } = DatePicker;

const Graphs = () => {
  const [stations] = useState([
    { id: 'A310', name: 'Areia' },
    { id: 'A348', name: 'Cabaceiras' },
    { id: 'A352', name: 'Camatuba' },
    { id: 'A313', name: 'Campina Grande' },
    { id: 'A373', name: 'Itaporanga' },
    { id: 'A320', name: 'João Pessoa' },
    { id: 'A334', name: 'Monteiro' },
    { id: 'A321', name: 'Patos' },
    { id: 'A333', name: 'São Gonçalo' }
  ]);

  const [selectedStation, setSelectedStation] = useState(null);
  const [dateType, setDateType] = useState('dia'); 
  const [finalDateType, setFinalDateType] = useState('dia');
  const [dateValue, setDateValue] = useState(null); 
  const [weatherData, setWeatherData] = useState([]);

  const handleStationChange = (value) => {
    setSelectedStation(value);
  };

  const handleDateTypeChange = (value) => {
    setDateType(value);
    setDateValue(null);
  };

  const columns = [
    {
      title: finalDateType === 'dia' ? 'Hora (UTC)' : 'Dia',
      dataIndex: 'hora',
      key: 'hora'
    },
    { 
      title: finalDateType === 'dia' ? 'Temp. Ins. (C)' : 'Média Temp. Ins. (C)',
      dataIndex: 'tempBulboSeco',
      key: 'tempIns' 
    },
    { 
      title: finalDateType === 'dia' ? 'Temp. Max. (C)' : 'Média Temp. Max. (C)',
      dataIndex: 'tempMax',
      key: 'tempMax' 
    },
    { 
      title: finalDateType === 'dia' ? 'Temp. Min. (C)' : 'Média Temp. Min. (C)',
      dataIndex: 'tempMin',
      key: 'tempMin' 
    },
    { 
      title: finalDateType === 'dia' ? 'Umi. Ins. (%)' : 'Média Umi. Ins. (%)',
      dataIndex: 'umidadeRelativa',
      key: 'umiIns' 
    },
    { 
      title: finalDateType === 'dia' ? 'Umi. Max. (%)' : 'Média Umi. Max. (%)',
      dataIndex: 'umidadeRelativaMax',
      key: 'umiMax' 
    },
    { 
      title: finalDateType === 'dia' ? 'Umi. Min. (%)' : 'Média Umi. Min. (%)',
      dataIndex: 'umidadeRelativaMin',
      key: 'umiMin' 
    },
    { 
      title: finalDateType === 'dia' ? 'Pto Orvalho Ins. (C)' : 'Média Pto Orvalho Ins. (C)',
      dataIndex: 'tempPontoOrvalho',
      key: 'ptoOrvalhoIns' 
    },
    { 
      title: finalDateType === 'dia' ? 'Pto Orvalho Max. (C)' : 'Média Pto Orvalho Max. (C)',
      dataIndex: 'tempOrvalhoMax',
      key: 'ptoOrvalhoMax' 
    },
    { 
      title: finalDateType === 'dia' ? 'Pto Orvalho Min. (C)' : 'Média Pto Orvalho Min. (C)',
      dataIndex: 'tempOrvalhoMin',
      key: 'ptoOrvalhoMin' 
    },
    { 
      title: finalDateType === 'dia' ? 'Pressao Ins. (hPa)' : 'Média Pressao Ins. (hPa)',
      dataIndex: 'pressaoAtmosfericaNivelEstacao',
      key: 'pressaoIns' 
    },
    { 
      title: finalDateType === 'dia' ? 'Pressao Max. (hPa)' : 'Média Pressao Max. (hPa)',
      dataIndex: 'pressaoAtmosfericaMax',
      key: 'pressaoMax' 
    },
    { 
      title: finalDateType === 'dia' ? 'Pressao Min. (hPa)' : 'Média Pressao Min. (hPa)',
      dataIndex: 'pressaoAtmosfericaMin',
      key: 'pressaoMin' 
    },
    { 
      title: finalDateType === 'dia' ? 'Vel. Vento (m/s)' : 'Média Vel. Vento (m/s)',
      dataIndex: 'ventoVelocidade',
      key: 'velVento' 
    },
    { 
      title: finalDateType === 'dia' ? 'Dir. Vento (m/s)' : 'Média Dir. Vento (m/s)',
      dataIndex: 'ventoDirecao',
      key: 'dirVento' 
    },
    { 
      title: finalDateType === 'dia' ? 'Raj. Vento (m/s)' : 'Média Raj. Vento (m/s)',
      dataIndex: 'ventoRajadaMax',
      key: 'rajVento' 
    },
    { 
      title: finalDateType === 'dia' ? 'Radiacao (KJ/m²)' : 'Radiacao Média (KJ/m²)',
      dataIndex: 'radiacaoGlobal',
      key: 'radiacao' 
    },
    { 
      title: finalDateType === 'dia' ? 'Chuva (mm)' : 'Pluviosidade Média (mm)',
      dataIndex: 'precipitacaoTotal',
      key: 'chuva' 
    }
  ];
  

  const generateDateOptions = () => {
    if (dateType === 'dia') {
      return <DatePicker style={{ width: 200, marginLeft: '10px', marginRight: '10px' }} onChange={(_, dateString) => setDateValue(dateString)} />;
    } else if (dateType === 'mes') {
      return (
        <MonthPicker
          placeholder="Selecione um mês"
          format="YYYY-MM"
          style={{ width: 200, marginLeft: '10px', marginRight: '10px' }}
          onChange={(_, dateString) => setDateValue(dateString)}
          value={dateValue ? dayjs(dateValue, 'YYYY-MM') : null}
        />
      );
    }
  };

  const filterViewTable = async () => {
    if (!dateValue || !selectedStation) {
      alert("Selecione uma estação e uma data");
      return;
    }
  
    try {
      let response, formattedData = [];
      if (dateType === 'dia') {
        const dateParam = dateValue;
        response = await axios.get(`${baseUrlWeatherData}${selectedStation}?date=${dateParam}`);
        const receivedData = response.data.metrics;
  
        formattedData = receivedData.map(item => ({
          hora: item.hora,
          tempBulboSeco: item.tempBulboSeco?.toFixed(2),
          tempMax: item.tempMax?.toFixed(2),
          tempMin: item.tempMin?.toFixed(2),
          umidadeRelativa: item.umidadeRelativa?.toFixed(2),
          umidadeRelativaMax: item.umidadeRelativaMax?.toFixed(2),
          umidadeRelativaMin: item.umidadeRelativaMin?.toFixed(2),
          tempPontoOrvalho: item.tempPontoOrvalho?.toFixed(2),
          tempOrvalhoMax: item.tempOrvalhoMax?.toFixed(2),
          tempOrvalhoMin: item.tempOrvalhoMin?.toFixed(2),
          pressaoAtmosfericaNivelEstacao: item.pressaoAtmosfericaNivelEstacao?.toFixed(2),
          pressaoAtmosfericaMax: item.pressaoAtmosfericaMax?.toFixed(2),
          pressaoAtmosfericaMin: item.pressaoAtmosfericaMin?.toFixed(2),
          ventoVelocidade: item.ventoVelocidade?.toFixed(2),
          ventoDirecao: item.ventoDirecao?.toFixed(2),
          ventoRajadaMax: item.ventoRajadaMax?.toFixed(2),
          radiacaoGlobal: item.radiacaoGlobal,
          precipitacaoTotal: item.precipitacaoTotal?.toFixed(2),
        }));
      } else if (dateType === 'mes') {
        const [ano, mes] = dateValue.split('-');
        response = await axios.get(`${baseUrlWeatherData}${selectedStation}/${ano}/${mes}`);
        const dailyData = response.data.dailyAverage;
        const monthlyData = response.data.monthlyAverage;
  
        // Formatar dados diários
        formattedData = Object.keys(dailyData).map(day => ({
          hora: `Dia ${day.split('_')[1]}`,
          tempBulboSeco: dailyData[day].mediaTempBulboSeco.toFixed(2),
          tempMax: dailyData[day].mediaTempMax.toFixed(2),
          tempMin: dailyData[day].mediaTempMin.toFixed(2),
          umidadeRelativa: dailyData[day].mediaUmidadeRelativa.toFixed(2),
          umidadeRelativaMax: dailyData[day].mediaUmidadeRelativaMax.toFixed(2),
          umidadeRelativaMin: dailyData[day].mediaUmidadeRelativaMin.toFixed(2),
          tempPontoOrvalho: dailyData[day].mediaTempPontoOrvalho.toFixed(2),
          tempOrvalhoMax: dailyData[day].mediaTempOrvalhoMax.toFixed(2),
          tempOrvalhoMin: dailyData[day].mediaTempOrvalhoMin.toFixed(2),
          pressaoAtmosfericaNivelEstacao: dailyData[day].mediaPressaoAtmosfericaNivelEstacao.toFixed(2),
          pressaoAtmosfericaMax: dailyData[day].mediaPressaoAtmosfericaMax.toFixed(2),
          pressaoAtmosfericaMin: dailyData[day].mediaPressaoAtmosfericaMin.toFixed(2),
          ventoVelocidade: dailyData[day].mediaVentoVelocidade.toFixed(2),
          ventoDirecao: dailyData[day].mediaVentoDirecao.toFixed(2),
          ventoRajadaMax: dailyData[day].mediaVentoRajadaMax.toFixed(2),
          radiacaoGlobal: dailyData[day].mediaRadiacaoGlobal.toFixed(2),
          precipitacaoTotal: dailyData[day].mediaPrecipitacaoTotal.toFixed(2),
        }))
        .sort((a, b) => parseInt(a.hora.split(' ')[1]) - parseInt(b.hora.split(' ')[1]));
  
        // Adicionar linha de médias mensais
        formattedData.push({
          hora: 'Média Mensal',
          tempBulboSeco: monthlyData.mediaTempBulboSeco.toFixed(2),
          tempMax: monthlyData.mediaTempMax.toFixed(2),
          tempMin: monthlyData.mediaTempMin.toFixed(2),
          umidadeRelativa: monthlyData.mediaUmidadeRelativa.toFixed(2),
          umidadeRelativaMax: monthlyData.mediaUmidadeRelativaMax.toFixed(2),
          umidadeRelativaMin: monthlyData.mediaUmidadeRelativaMin.toFixed(2),
          tempPontoOrvalho: monthlyData.mediaTempPontoOrvalho.toFixed(2),
          tempOrvalhoMax: monthlyData.mediaTempOrvalhoMax.toFixed(2),
          tempOrvalhoMin: monthlyData.mediaTempOrvalhoMin.toFixed(2),
          pressaoAtmosfericaNivelEstacao: monthlyData.mediaPressaoAtmosfericaNivelEstacao.toFixed(2),
          pressaoAtmosfericaMax: monthlyData.mediaPressaoAtmosfericaMax.toFixed(2),
          pressaoAtmosfericaMin: monthlyData.mediaPressaoAtmosfericaMin.toFixed(2),
          ventoVelocidade: monthlyData.mediaVentoVelocidade.toFixed(2),
          ventoDirecao: monthlyData.mediaVentoDirecao.toFixed(2),
          ventoRajadaMax: monthlyData.mediaVentoRajadaMax.toFixed(2),
          radiacaoGlobal: monthlyData.mediaRadiacaoGlobal.toFixed(2),
          precipitacaoTotal: monthlyData.mediaPrecipitacaoTotal.toFixed(2),
        });
      }
  
      setWeatherData(formattedData);
      alert("Dados Recebidos!")
    } catch (error) {
      alert("Erro ao buscar dados!")
      console.error("Erro ao buscar dados:", error);
    }
  };
  

  return (
    <div className="station-container">
      <div className="datapicker-container">
        <h2>Selecione um Tipo de Data</h2>
        <div className="datapicker">
          <label>
            Estação Metereológica:
            <Select
              style={{ width: 200, marginLeft: '10px', marginRight: '10px' }} 
              placeholder="Selecione uma estação"
              onChange={handleStationChange} 
              value={selectedStation}
            >
              {stations.map((station) => (
                <Select.Option key={station.id} value={station.id}>
                  {station.name} ({station.id})
                </Select.Option>
              ))}
            </Select>
          </label>
          <label>
            Tipo de Data:
            <Select
              style={{ width: 150, marginLeft: '10px', marginRight: '10px' }}
              onChange={handleDateTypeChange}
              value={dateType}
            >
              <Select.Option value="dia">Dia</Select.Option>
              <Select.Option value="mes">Mês</Select.Option>
            </Select>
          </label>
          <label>
            Valor:
            {generateDateOptions()}
          </label>
          <Button 
            type="primary" 
            style={{ marginLeft: '30px' }}
            onClick={() => { setFinalDateType(dateType); filterViewTable(); }}
          >
            Filtrar
          </Button>
        </div>
      </div>

      <Tabs defaultActiveKey="1" type="card" style={{ marginTop: '30px' }}>
        <items tab="Tabela" key="1">
          <Table dataSource={weatherData} columns={columns} pagination={false} />
        </items>
        <items tab="Bulbo Seco" key="2">
          <DryBulbTempChart data={weatherData} />
        </items>
        <items tab="Ponto de Orvalho" key="3">
          <DewPointTempChart data={weatherData} />
        </items>
        <items tab="Umidade" key="4">
          <HumidityChart data={weatherData} />
        </items>
        <items tab="Pressão" key="5">
          <PressureChart data={weatherData} />
        </items>
        <items tab="Vento" key="6">
          <WindChart data={weatherData} />
        </items>
        <items tab="Radiação" key="7">
          <RadiationChart data={weatherData} />
        </items>
        <items tab="Pluviosidade" key="8">
          <PluviosityChart data={weatherData} />
        </items>
      </Tabs>
    </div>
  );
};

export default Graphs;