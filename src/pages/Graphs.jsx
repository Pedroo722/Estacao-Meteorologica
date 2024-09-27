import React, { useState, useEffect } from 'react';
import { Button, DatePicker, Table, Tabs, Select } from 'antd'; 
import dayjs from 'dayjs';
import TemperatureChart from '../components/TemperaturaChart';
import '../styles/Graphs.css';

const { TabPane } = Tabs;

// dados de exemplo para preencher a tabela
const exampleData = [
  {
    "Data": "2024-08-01",
    "Hora (UTC)": "00:00",
    "Temp. Ins. (C)": 22.5,
    "Temp. Max. (C)": 24.1,
    "Temp. Min. (C)": 21.3,
    "Umi. Ins. (%)": 78,
    "Umi. Max. (%)": 85,
    "Umi. Min. (%)": 70,
    "Pto Orvalho Ins. (C)": 18.3,
    "Pto Orvalho Max. (C)": 19.5,
    "Pto Orvalho Min. (C)": 17.0,
    "Pressao Ins. (hPa)": 1012,
    "Pressao Max. (hPa)": 1015,
    "Pressao Min. (hPa)": 1009,
    "Vel. Vento (m/s)": 3.2,
    "Dir. Vento (m/s)": 180,
    "Raj. Vento (m/s)": 4.5,
    "Radiacao (KJ/m²)": 350,
    "Chuva (mm)": 0
  },
  {
    "Data": "2024-08-01",
    "Hora (UTC)": "03:00",
    "Temp. Ins. (C)": 21.8,
    "Temp. Max. (C)": 22.5,
    "Temp. Min. (C)": 20.6,
    "Umi. Ins. (%)": 81,
    "Umi. Max. (%)": 88,
    "Umi. Min. (%)": 75,
    "Pto Orvalho Ins. (C)": 18.9,
    "Pto Orvalho Max. (C)": 19.8,
    "Pto Orvalho Min. (C)": 17.6,
    "Pressao Ins. (hPa)": 1011,
    "Pressao Max. (hPa)": 1013,
    "Pressao Min. (hPa)": 1008,
    "Vel. Vento (m/s)": 2.8,
    "Dir. Vento (m/s)": 200,
    "Raj. Vento (m/s)": 3.9,
    "Radiacao (KJ/m²)": 340,
    "Chuva (mm)": 0
  },
  {
    "Data": "2024-08-01",
    "Hora (UTC)": "06:00",
    "Temp. Ins. (C)": 20.5,
    "Temp. Max. (C)": 21.8,
    "Temp. Min. (C)": 19.5,
    "Umi. Ins. (%)": 85,
    "Umi. Max. (%)": 90,
    "Umi. Min. (%)": 80,
    "Pto Orvalho Ins. (C)": 18.0,
    "Pto Orvalho Max. (C)": 18.9,
    "Pto Orvalho Min. (C)": 17.0,
    "Pressao Ins. (hPa)": 1013,
    "Pressao Max. (hPa)": 1016,
    "Pressao Min. (hPa)": 1010,
    "Vel. Vento (m/s)": 2.0,
    "Dir. Vento (m/s)": 190,
    "Raj. Vento (m/s)": 3.0,
    "Radiacao (KJ/m²)": 360,
    "Chuva (mm)": 0
  },
  {
    "Data": "2024-08-01",
    "Hora (UTC)": "09:00",
    "Temp. Ins. (C)": 24.0,
    "Temp. Max. (C)": 25.3,
    "Temp. Min. (C)": 23.1,
    "Umi. Ins. (%)": 70,
    "Umi. Max. (%)": 75,
    "Umi. Min. (%)": 65,
    "Pto Orvalho Ins. (C)": 18.6,
    "Pto Orvalho Max. (C)": 19.3,
    "Pto Orvalho Min. (C)": 17.8,
    "Pressao Ins. (hPa)": 1010,
    "Pressao Max. (hPa)": 1013,
    "Pressao Min. (hPa)": 1008,
    "Vel. Vento (m/s)": 4.0,
    "Dir. Vento (m/s)": 210,
    "Raj. Vento (m/s)": 5.2,
    "Radiacao (KJ/m²)": 370,
    "Chuva (mm)": 0
  },
  {
    "Data": "2024-08-01",
    "Hora (UTC)": "12:00",
    "Temp. Ins. (C)": 26.5,
    "Temp. Max. (C)": 28.0,
    "Temp. Min. (C)": 25.3,
    "Umi. Ins. (%)": 60,
    "Umi. Max. (%)": 65,
    "Umi. Min. (%)": 55,
    "Pto Orvalho Ins. (C)": 18.2,
    "Pto Orvalho Max. (C)": 19.0,
    "Pto Orvalho Min. (C)": 17.5,
    "Pressao Ins. (hPa)": 1009,
    "Pressao Max. (hPa)": 1011,
    "Pressao Min. (hPa)": 1007,
    "Vel. Vento (m/s)": 5.0,
    "Dir. Vento (m/s)": 220,
    "Raj. Vento (m/s)": 6.0,
    "Radiacao (KJ/m²)": 400,
    "Chuva (mm)": 0
  },
  {
    "Data": "2024-08-01",
    "Hora (UTC)": "15:00",
    "Temp. Ins. (C)": 27.8,
    "Temp. Max. (C)": 29.2,
    "Temp. Min. (C)": 26.5,
    "Umi. Ins. (%)": 55,
    "Umi. Max. (%)": 60,
    "Umi. Min. (%)": 50,
    "Pto Orvalho Ins. (C)": 18.0,
    "Pto Orvalho Max. (C)": 18.8,
    "Pto Orvalho Min. (C)": 17.2,
    "Pressao Ins. (hPa)": 1008,
    "Pressao Max. (hPa)": 1010,
    "Pressao Min. (hPa)": 1006,
    "Vel. Vento (m/s)": 5.5,
    "Dir. Vento (m/s)": 230,
    "Raj. Vento (m/s)": 6.5,
    "Radiacao (KJ/m²)": 410,
    "Chuva (mm)": 0
  },
  {
    "Data": "2024-08-01",
    "Hora (UTC)": "18:00",
    "Temp. Ins. (C)": 24.2,
    "Temp. Max. (C)": 25.0,
    "Temp. Min. (C)": 23.0,
    "Umi. Ins. (%)": 75,
    "Umi. Max. (%)": 80,
    "Umi. Min. (%)": 70,
    "Pto Orvalho Ins. (C)": 19.5,
    "Pto Orvalho Max. (C)": 20.0,
    "Pto Orvalho Min. (C)": 18.0,
    "Pressao Ins. (hPa)": 1011,
    "Pressao Max. (hPa)": 1013,
    "Pressao Min. (hPa)": 1009,
    "Vel. Vento (m/s)": 3.8,
    "Dir. Vento (m/s)": 240,
    "Raj. Vento (m/s)": 4.8,
    "Radiacao (KJ/m²)": 320,
    "Chuva (mm)": 0
  },
  {
    "Data": "2024-08-01",
    "Hora (UTC)": "21:00",
    "Temp. Ins. (C)": 22.0,
    "Temp. Max. (C)": 23.0,
    "Temp. Min. (C)": 21.0,
    "Umi. Ins. (%)": 80,
    "Umi. Max. (%)": 85,
    "Umi. Min. (%)": 75,
    "Pto Orvalho Ins. (C)": 18.5,
    "Pto Orvalho Max. (C)": 19.3,
    "Pto Orvalho Min. (C)": 17.5,
    "Pressao Ins. (hPa)": 1013,
    "Pressao Max. (hPa)": 1015,
    "Pressao Min. (hPa)": 1010,
    "Vel. Vento (m/s)": 3.0,
    "Dir. Vento (m/s)": 250,
    "Raj. Vento (m/s)": 4.0,
    "Radiacao (KJ/m²)": 280,
    "Chuva (mm)": 0
  },
  {
    "Data": "2024-08-02",
    "Hora (UTC)": "00:00",
    "Temp. Ins. (C)": 21.0,
    "Temp. Max. (C)": 21.8,
    "Temp. Min. (C)": 20.2,
    "Umi. Ins. (%)": 82,
    "Umi. Max. (%)": 88,
    "Umi. Min. (%)": 78,
    "Pto Orvalho Ins. (C)": 18.8,
    "Pto Orvalho Max. (C)": 19.6,
    "Pto Orvalho Min. (C)": 18.0,
    "Pressao Ins. (hPa)": 1014,
    "Pressao Max. (hPa)": 1017,
    "Pressao Min. (hPa)": 1012,
    "Vel. Vento (m/s)": 2.5,
    "Dir. Vento (m/s)": 180,
    "Raj. Vento (m/s)": 3.5,
    "Radiacao (KJ/m²)": 300,
    "Chuva (mm)": 0
  },
  {
    "Data": "2024-08-02",
    "Hora (UTC)": "03:00",
    "Temp. Ins. (C)": 20.0,
    "Temp. Max. (C)": 20.5,
    "Temp. Min. (C)": 19.5,
    "Umi. Ins. (%)": 85,
    "Umi. Max. (%)": 90,
    "Umi. Min. (%)": 80,
    "Pto Orvalho Ins. (C)": 18.0,
    "Pto Orvalho Max. (C)": 18.9,
    "Pto Orvalho Min. (C)": 17.3,
    "Pressao Ins. (hPa)": 1015,
    "Pressao Max. (hPa)": 1017,
    "Pressao Min. (hPa)": 1013,
    "Vel. Vento (m/s)": 2.0,
    "Dir. Vento (m/s)": 170,
    "Raj. Vento (m/s)": 2.8,
    "Radiacao (KJ/m²)": 290,
    "Chuva (mm)": 0
  }
];

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
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [weatherData, setWeatherData] = useState([]);

  const handleStationChange = (value) => {
    setSelectedStation(value);
  };

  useEffect(() => {
    setWeatherData(exampleData);
  }, []);

  const columns = [
    { title: 'Data', dataIndex: 'Data', key: 'data' },
    { title: 'Hora (UTC)', dataIndex: 'Hora (UTC)', key: 'hora' },
    { title: 'Temp. Ins. (C)', dataIndex: 'Temp. Ins. (C)', key: 'tempIns' },
    { title: 'Temp. Max. (C)', dataIndex: 'Temp. Max. (C)', key: 'tempMax' },
    { title: 'Temp. Min. (C)', dataIndex: 'Temp. Min. (C)', key: 'tempMin' },
    { title: 'Umi. Ins. (%)', dataIndex: 'Umi. Ins. (%)', key: 'umiIns' },
    { title: 'Umi. Max. (%)', dataIndex: 'Umi. Max. (%)', key: 'umiMax' },
    { title: 'Umi. Min. (%)', dataIndex: 'Umi. Min. (%)', key: 'umiMin' },
    { title: 'Pto Orvalho Ins. (C)', dataIndex: 'Pto Orvalho Ins. (C)', key: 'ptoOrvalhoIns' },
    { title: 'Pto Orvalho Max. (C)', dataIndex: 'Pto Orvalho Max. (C)', key: 'ptoOrvalhoMax' },
    { title: 'Pto Orvalho Min. (C)', dataIndex: 'Pto Orvalho Min. (C)', key: 'ptoOrvalhoMin' },
    { title: 'Pressao Ins. (hPa)', dataIndex: 'Pressao Ins. (hPa)', key: 'pressaoIns' },
    { title: 'Pressao Max. (hPa)', dataIndex: 'Pressao Max. (hPa)', key: 'pressaoMax' },
    { title: 'Pressao Min. (hPa)', dataIndex: 'Pressao Min. (hPa)', key: 'pressaoMin' },
    { title: 'Vel. Vento (m/s)', dataIndex: 'Vel. Vento (m/s)', key: 'velVento' },
    { title: 'Dir. Vento (m/s)', dataIndex: 'Dir. Vento (m/s)', key: 'dirVento' },
    { title: 'Raj. Vento (m/s)', dataIndex: 'Raj. Vento (m/s)', key: 'rajVento' },
    { title: 'Radiacao (KJ/m²)', dataIndex: 'Radiacao (KJ/m²)', key: 'radiacao' },
    { title: 'Chuva (mm)', dataIndex: 'Chuva (mm)', key: 'chuva' },
  ];

  const filterViewTable = () => {
    console.log("Em implementação");
  };

  return (
    <div className="station-container">
      <div className="datapicker-container">
        <h2>Selecione um Intervalo de Datas</h2>
        <div className="datapicker">
        <label>
            Estação Metereólogica:
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
            Data de Início:
            <DatePicker 
              style={{ marginLeft: '10px', marginRight: '10px' }}
              value={startDate ? dayjs(startDate) : null} 
              onChange={(date) => setStartDate(date)} 
            />
          </label>
          <label>
            Data de Fim:
            <DatePicker 
              style={{ marginLeft: '10px' }}
              value={endDate ? dayjs(endDate) : null} 
              onChange={(date) => setEndDate(date)} 
            />
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
        <TabPane tab="Tabela Geral" key="1">
          <div className="data-container">
            <div className="station-content">
              {weatherData.length > 0 ? (
                <Table 
                  dataSource={weatherData} 
                  columns={columns} 
                  rowKey={(record, index) => index}
                  pagination={{ pageSize: 24 }}
                />
              ) : (
                <p>Carregando dados...</p>
              )}
            </div>
          </div>
        </TabPane>
        <TabPane tab="Temperatura" key="2">
          <TemperatureChart data={weatherData} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Graphs;
