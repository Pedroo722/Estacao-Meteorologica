import React, { useState } from 'react';
import { HomeOutlined, LineChartOutlined, InfoCircleOutlined } from '@ant-design/icons';
import Theme from '../components/ThemeToggle';


const DashBar = ({ toggleDash, isMinimized }) => { // Receber props aqui

  const handleToggleDashBar = () => {
    toggleDash(); // Chamar o toggleDash vindo do App via props
  };

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const switchTheme = () => {
    setIsDarkTheme(prevTheme => !prevTheme);
    document.querySelector('body').setAttribute('data-theme', isDarkTheme ? 'light' : 'dark');
  }

  return (
    <aside style={{
        width: isMinimized ? '50px' : '300px',  // Aqui usamos o isMinimized recebido como prop
        backgroundColor: '#03624C',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        padding: isMinimized ? '10px' : '20px',
        boxSizing: 'border-box',
        transition: 'width 0.3s ease',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: isMinimized ? 'center' : 'space-between', 
        alignItems: 'center',
        marginBottom: isMinimized ? '0' : '50px',
        
      }}>
        {!isMinimized && <h2 style={{color: 'white'}}>DashBoard</h2>}
        <div 
          style={{ fontSize: '20px', cursor: 'pointer', color: 'white' }} 
          onClick={handleToggleDashBar}  // Alterar o estado usando o toggleDash
        >
          &#9776; {/* Ícone de menu */}
        </div>
      </div>

      {!isMinimized && ( 
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <HomeOutlined style={{ fontSize: '20px', marginRight: '10px', color: 'white' }} />
            <a href="/" style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold' }}>Inicial</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <LineChartOutlined style={{ fontSize: '20px', marginRight: '10px', color: 'white' }} />
            <a href="#/graphs" style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold' }}>Gráficos</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <InfoCircleOutlined style={{ fontSize: '20px', marginRight: '10px', color: 'white' }} />
            <a href="#/info" style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold' }}>Informações</a>
          </div>

        </nav>
        
      )}

      {!isMinimized && (
        <div onClick={switchTheme} style={{alignSelf: 'center',  marginTop: 'auto', textAlign: 'center'}}>
          <p style={{ color: 'white', fontWeight: 'bold', margin: '0px' }}>Tema</p>

          <Theme />
        </div>
      )}
    </aside>
  );
};

export default DashBar;
