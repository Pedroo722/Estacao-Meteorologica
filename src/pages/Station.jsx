import React, { useState, useEffect } from 'react';
import { Button, DatePicker, Table, Tabs } from 'antd'; 
import StationDetails from '../components/StationDetails'; 
import dayjs from 'dayjs';
import Papa from 'papaparse';
import '../styles/Station.css';

const { TabPane } = Tabs;

const Station = () => {
  const stationDetails = {
    city: "Campina Grande",
    state: "PB",
    creationDate: "01/01/2000",
    code: "A313",
    latitude: "-23.5505",
    longitude: "-46.6333",
  };

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [weatherData, setWeatherData] = useState([]);

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
      <StationDetails details={stationDetails} />

      <div className="datapicker-container">
        <h2>Selecione um Intervalo de Datas</h2>
        <div className="datapicker">
          <label>
            Data de Início:
            <DatePicker 
              style={{ marginLeft: '10px' }}
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