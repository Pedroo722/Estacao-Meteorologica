import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Table, Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons'; 
import Papa from 'papaparse';

const StationList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { stateId, name } = location.state || {}; 

  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('State ID:', stateId);

    Papa.parse('/data/CatalogoEstacoesAutomaticas.csv', {
      download: true,
      header: true,
      delimiter: ';',
      complete: (result) => {
        console.log('Parsed Data:', result.data);
        const stations = result.data
          .filter(station => station.SG_ESTADO?.trim() === stateId?.trim().toUpperCase())
          .map(station => ({
            city: station.DC_NOME,
            station: station.CD_SITUACAO,
            installationDate: station.DT_INICIO_OPERACAO,
            code: station.CD_ESTACAO,
          }));
        console.log('Filtered Stations:', stations);
        setData(stations);
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
      }
    });
  }, [stateId]);

  const columns = [
    {
      title: 'Cidade',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Estação',
      dataIndex: 'station',
      key: 'station',
    },
    {
      title: 'Data de Instalação',
      dataIndex: 'installationDate',
      key: 'installationDate',
    },
    {
      title: 'Código',
      dataIndex: 'code',
      key: 'code',
      render: (text) => (
        <Button type="link" onClick={() => navigate(`/stations/${stateId}/${text}`)}>
          {text}
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div className="headerContainer">
        <Button onClick={() => navigate('/')}>
          <LeftOutlined /> Voltar
        </Button>
        <h1 className="title">Estações Meteorológicas em {name}</h1>
      </div>
      <Table columns={columns} dataSource={data} rowKey="code" />
    </div>
  );
};

export default StationList;
