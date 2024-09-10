import React from 'react';
import { HomeOutlined, LineChartOutlined, InfoCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const DashBar = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <aside style={{
        width: '300px',
        backgroundColor: '#a6a6a6',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        padding: '20px',
        boxSizing: 'border-box'
      }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '50px'
      }}>
        <h2>DashBoard</h2>
        <ArrowLeftOutlined 
          style={{ fontSize: '20px', cursor: 'pointer' }} 
          onClick={handleGoBack} 
        />
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <HomeOutlined style={{ fontSize: '20px', marginRight: '10px' }} />
          <span>Inicial</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <LineChartOutlined style={{ fontSize: '20px', marginRight: '10px' }} />
          <span>Gráficos</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <InfoCircleOutlined style={{ fontSize: '20px', marginRight: '10px' }} />
          <span>Informações</span>
        </div>
      </nav>
    </aside>
  );
};

export default DashBar;
