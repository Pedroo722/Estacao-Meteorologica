import React, { useState } from 'react';
import { HomeOutlined, LineChartOutlined, InfoCircleOutlined } from '@ant-design/icons';
import Theme from '../components/ThemeToggle';
import '../styles/DashBar.css';

const DashBar = ({ toggleDash, isMinimized }) => { 
  const handleToggleDashBar = () => {
    toggleDash(); 
  };

  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [activeOption, setActiveOption] = useState('home'); // Estado para rastrear a opção ativa

  const handleOptionClick = (option) => {
    setActiveOption(option); // Atualiza a opção selecionada
  }
  const switchTheme = () => {
    setIsDarkTheme(prevTheme => !prevTheme);
    document.querySelector('body').setAttribute('data-theme', isDarkTheme ? 'light' : 'dark');
  };

  

  return (
    <aside 
      className="aside"
      style={{
        width: isMinimized ? '50px' : '300px',
        backgroundColor: '#FFF',
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
        borderRightWidth: '3px',
        borderRightColor: '#000',
        borderRightStyle: 'solid',
      }}
    >
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: isMinimized ? 'center' : 'space-between', 
          alignItems: 'center',
          marginBottom: isMinimized ? '0' : '50px',
        }}
      >
        {!isMinimized && <h2 style={{color: 'black'}}>DashBoard</h2>}
        <div 
          style={{ fontSize: '20px', cursor: 'pointer', color: 'black' }} 
          onClick={handleToggleDashBar}
        >
          &#9776; {/* Ícone de menu */}
        </div>
      </div>

      

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div
        className={`nav-option ${activeOption === 'home' ? 'active' : ''}`} // Aplica a classe 'active' se for a opção selecionada
        onClick={() => handleOptionClick('home')} // Define 'home' como ativo
      >
        <HomeOutlined style={{ fontSize: '20px', marginRight: isMinimized ? '0' : '10px', color: 'black' }} />
        {!isMinimized && <a href="/" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>Inicial</a>}
      </div>
      <div
        className={`nav-option ${activeOption === 'graphs' ? 'active' : ''}`}
        onClick={() => handleOptionClick('graphs')}
      >
        <LineChartOutlined style={{ fontSize: '20px', marginRight: isMinimized ? '0' : '10px', color: 'black' }} />
        {!isMinimized && <a href="#/graphs" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>Gráficos</a>}
      </div>
      <div
        className={`nav-option ${activeOption === 'info' ? 'active' : ''}`}
        onClick={() => handleOptionClick('info')}
      >
        <InfoCircleOutlined style={{ fontSize: '20px', marginRight: isMinimized ? '0' : '10px', color: 'black' }} />
        {!isMinimized && <a href="#/info" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>Informações</a>}
      </div>
    </nav>

      {!isMinimized && (
        <div onClick={switchTheme} style={{ alignSelf: 'center', marginTop: 'auto', textAlign: 'center' }}>
          <p style={{ color: 'white', fontWeight: 'bold', margin: '0px' }}>Tema</p>
          <Theme />
        </div>
      )}
    </aside>
  );
};

export default DashBar;
