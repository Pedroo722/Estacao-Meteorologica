import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook para navegação
import { HomeOutlined, LineChartOutlined, InfoCircleOutlined } from '@ant-design/icons';
import Theme from '../components/ThemeToggle';
import '../styles/DashBar.css';

const DashBar = ({ toggleDash, isMinimized }) => {
  const navigate = useNavigate(); // Inicializa o hook de navegação
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [activeOption, setActiveOption] = useState('home'); // Estado para rastrear a opção ativa

  const handleOptionClick = (option, path) => {
    setActiveOption(option); // Atualiza a opção ativa
    navigate(path); // Redireciona para a página correspondente
  };

  const switchTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
    document
      .querySelector('body')
      .setAttribute('data-theme', isDarkTheme ? 'light' : 'dark');
  };

  return (
    <aside
      className="aside"
      style={{
        width: isMinimized ? '60px' : '300px',
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
        borderRightWidth: '1px',
        borderRightColor: '#03624C',
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
        {!isMinimized && <h2 style={{ color: '#03624C' }}>DashBoard</h2>}
        <div
          style={{
            fontSize: '20px',
            cursor: 'pointer',
            color: '#03624C',
          }}
          onClick={toggleDash}
        >
          &#9776; {/* Ícone de menu */}
        </div>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div
          className={`nav-option ${activeOption === 'home' ? 'active' : ''}`}
          onClick={() => handleOptionClick('home', '/')} // Redireciona para '/'
          style={{ cursor: 'pointer' }}
        >
          <HomeOutlined
            style={{
              fontSize: '20px',
              marginRight: isMinimized ? '0' : '10px',
              color: '#03624C',
            }}
          />
          {!isMinimized && (
            <span
              style={{
                textDecoration: 'none',
                color: '#03624C',
                fontWeight: 'bold',
              }}
            >
              Inicial
            </span>
          )}
        </div>
        <div
          className={`nav-option ${activeOption === 'graphs' ? 'active' : ''}`}
          onClick={() => handleOptionClick('graphs', '/graphs')} // Redireciona para '/graphs'
          style={{ cursor: 'pointer' }}
        >
          <LineChartOutlined
            style={{
              fontSize: '20px',
              marginRight: isMinimized ? '0' : '10px',
              color: '#03624C',
            }}
          />
          {!isMinimized && (
            <span
              style={{
                textDecoration: 'none',
                color: '#03624C',
                fontWeight: 'bold',
              }}
            >
              Gráficos
            </span>
          )}
        </div>
        <div
          className={`nav-option ${activeOption === 'info' ? 'active' : ''}`}
          onClick={() => handleOptionClick('info', '/info')} // Redireciona para '/info'
          style={{ cursor: 'pointer' }}
        >
          <InfoCircleOutlined
            style={{
              fontSize: '20px',
              marginRight: isMinimized ? '0' : '10px',
              color: '#03624C',
            }}
          />
          {!isMinimized && (
            <span
              style={{
                textDecoration: 'none',
                color: '#03624C',
                fontWeight: 'bold',
              }}
            >
              Informações
            </span>
          )}
        </div>
      </nav>

      {!isMinimized && (
        <div
          onClick={switchTheme}
          style={{
            alignSelf: 'center',
            marginTop: 'auto',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              color: '#03624C',
              fontWeight: 'bold',
              margin: '0px',
            }}
          >
            Tema
          </p>
          <Theme />
        </div>
      )}
    </aside>
  );
};

export default DashBar;

