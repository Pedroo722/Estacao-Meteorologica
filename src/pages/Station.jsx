import React, { useState, useEffect } from 'react';
import { Button, DatePicker, Table, Tabs, Select } from 'antd'; 
import StationDetails from '../components/StationDetails'; 
import dayjs from 'dayjs';
import Papa from 'papaparse';
import '../styles/Station.css';
import DashBar from '../components/DashBar';

const { TabPane } = Tabs;

const Station = () => {
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
    const loadCSV = async () => {
      const response = await fetch('data/PB_CG_22082024.csv');
      const text = await response.text();

      Papa.parse(text, {
        header: true,
        delimiter: ";",
        complete: (results) => {
          setWeatherData(results.data);
        },
      });
    };

    loadCSV();
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
      <DashBar />

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
        <TabPane tab="Tabela" key="1">
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
        <TabPane tab="Gráficos" key="2">
          <p>Placeholder.</p>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Station;