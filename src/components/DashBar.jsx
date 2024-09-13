import React, { useState } from 'react';
import { HomeOutlined, LineChartOutlined, InfoCircleOutlined } from '@ant-design/icons';

const DashBar = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  const handleToggleDashBar = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <aside style={{
        width: isMinimized ? '50px' : '300px',  // Tamanho reduzido quando minimizado
        backgroundColor: '#a6a6a6',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        padding: isMinimized ? '10px' : '20px', // Ajusta o padding ao minimizar
        boxSizing: 'border-box',
        transition: 'width 0.3s ease' // Animação suave para minimizar/maximizar
      }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: isMinimized ? 'center' : 'space-between', 
        alignItems: 'center',
        marginBottom: isMinimized ? '0' : '50px'
      }}>
        {!isMinimized && <h2>DashBoard</h2>}
        <div 
          style={{ fontSize: '20px', cursor: 'pointer' }} 
          onClick={handleToggleDashBar}
        >
          &#9776; {/* Ícone de menu que sempre estará visível */}
        </div>
      </div>

      {!isMinimized && (  // Condicional para mostrar/esconder o conteúdo da barra
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
      )}
    </aside>
  );
};

export default DashBar;
