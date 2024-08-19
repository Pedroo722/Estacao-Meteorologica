import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Table, Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons'; 

const StationList = () => {
  const { stateId } = useParams();
  const navigate = useNavigate();

  const columns = [
    {
      title: 'Cidade',
      dataIndex: 'city',
      key: 'city',
    },
  ];

  const data = [];

  return (
    <div>
      <div className="headerContainer">
        <Button onClick={() => navigate('/')}>
          <LeftOutlined /> Voltar
        </Button>
        <h1 className="title">Estações Meteorológicas em {stateId}</h1>
      </div>
      <Table columns={columns} dataSource={data} rowKey="city" />
    </div>
  );
};

export default StationList;
