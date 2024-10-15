import React, { useState } from 'react';
import { Button, DatePicker, Table, Tabs, Select } from 'antd'; 
import dayjs from 'dayjs';
import axios from 'axios';
import '../styles/Graphs.css';
import TemperatureChart from '../components/graphs/TemperaturaChart';
import HumidityChart from '../components/graphs/HumidityChart';
import DewPointChart from '../components/graphs/DewPointChart';
import PluviosityChart from '../components/graphs/PluviosityChart';
import WindChart from '../components/graphs/WindChart';
import { baseUrlWeatherData } from "../util/constants";

const { TabPane } = Tabs;
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
    { title: 'Data', dataIndex: 'data', key: 'data' },
    { title: 'Hora (UTC)', dataIndex: 'hora', key: 'hora' },
    { title: 'Temp. Ins. (C)', dataIndex: 'tempBulboSeco', key: 'tempIns' },
    { title: 'Temp. Max. (C)', dataIndex: 'tempMax', key: 'tempMax' },
    { title: 'Temp. Min. (C)', dataIndex: 'tempMin', key: 'tempMin' },
    { title: 'Umi. Ins. (%)', dataIndex: 'umidadeRelativa', key: 'umiIns' },
    { title: 'Umi. Max. (%)', dataIndex: 'umidadeRelativaMax', key: 'umiMax' },
    { title: 'Umi. Min. (%)', dataIndex: 'umidadeRelativaMin', key: 'umiMin' },
    { title: 'Pto Orvalho Ins. (C)', dataIndex: 'tempPontoOrvalho', key: 'ptoOrvalhoIns' },
    { title: 'Pto Orvalho Max. (C)', dataIndex: 'tempOrvalhoMax', key: 'ptoOrvalhoMax' },
    { title: 'Pto Orvalho Min. (C)', dataIndex: 'tempOrvalhoMin', key: 'ptoOrvalhoMin' },
    { title: 'Pressao Ins. (hPa)', dataIndex: 'pressaoAtmosfericaNivelEstacao', key: 'pressaoIns' },
    { title: 'Pressao Max. (hPa)', dataIndex: 'pressaoAtmosfericaMax', key: 'pressaoMax' },
    { title: 'Pressao Min. (hPa)', dataIndex: 'pressaoAtmosfericaMin', key: 'pressaoMin' },
    { title: 'Vel. Vento (m/s)', dataIndex: 'ventoVelocidade', key: 'velVento' },
    { title: 'Dir. Vento (m/s)', dataIndex: 'ventoDirecao', key: 'dirVento' },
    { title: 'Raj. Vento (m/s)', dataIndex: 'ventoRajadaMax', key: 'rajVento' },
    { title: 'Radiacao (KJ/m²)', dataIndex: 'radiacaoGlobal', key: 'radiacao' },
    { title: 'Chuva (mm)', dataIndex: 'precipitacaoTotal', key: 'chuva' },
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
      console.log("Selecione uma estação e uma data");
      return;
    }

    try {
      const dateParam = dateType === 'dia' ? dateValue : dayjs(dateValue).format('YYYY-MM');
      const response = await axios.get(`${baseUrlWeatherData}${selectedStation}?date=${dateParam}`);
      const receivedData = response.data.data; 

      // Mapear os dados para o formato esperado pela tabela
      const formattedData = receivedData.map(item => ({
        data: item.data,
        hora: item.hora,
        tempBulboSeco: item.tempBulboSeco,
        tempMax: item.tempMax,
        tempMin: item.tempMin,
        umidadeRelativa: item.umidadeRelativa,
        umidadeRelativaMax: item.umidadeRelativaMax,
        umidadeRelativaMin: item.umidadeRelativaMin,
        tempPontoOrvalho: item.tempPontoOrvalho,
        tempOrvalhoMax: item.tempOrvalhoMax,
        tempOrvalhoMin: item.tempOrvalhoMin,
        pressaoAtmosfericaNivelEstacao: item.pressaoAtmosfericaNivelEstacao,
        pressaoAtmosfericaMax: item.pressaoAtmosfericaMax,
        pressaoAtmosfericaMin: item.pressaoAtmosfericaMin,
        ventoVelocidade: item.ventoVelocidade,
        ventoDirecao: item.ventoDirecao,
        ventoRajadaMax: item.ventoRajadaMax,
        radiacaoGlobal: item.radiacaoGlobal,
        precipitacaoTotal: item.precipitacaoTotal,
      }));

      setWeatherData(formattedData);
    } catch (error) {
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
            onClick={filterViewTable}
          >
            Filtrar
          </Button>
        </div>
      </div>

      <Tabs defaultActiveKey="1" type="card" style={{ marginTop: '30px' }}>
        <TabPane tab="Tabela" key="1">
          <Table dataSource={weatherData} columns={columns} pagination={false} />
        </TabPane>
        <TabPane tab="Temperatura" key="2">
          <TemperatureChart data={weatherData} />
        </TabPane>
        <TabPane tab="Umidade" key="3">
          <HumidityChart data={weatherData} />
        </TabPane>
        <TabPane tab="Ponto de Orvalho" key="4">
          <DewPointChart data={weatherData} />
        </TabPane>
        <TabPane tab="Pressão" key="6">
        {/*  <PressureChart data={weatherData} /> */}
        </TabPane>
        <TabPane tab="Vento" key="6">
          <WindChart data={weatherData} />
        </TabPane>
        <TabPane tab="Radiação" key="6">
        {/*  <RadiationChart data={weatherData} /> */}
        </TabPane>
        <TabPane tab="Pluviosidade" key="5">
          <PluviosityChart data={weatherData} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Graphs;
