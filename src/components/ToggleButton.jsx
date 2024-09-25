import React, { useState } from 'react';

const ToggleButton = () => {
  // Gerenciar o estado de dia/noite
  const [isDay, setIsDay] = useState(true);

  // Função para alternar entre os temas
  const toggleTheme = () => {
    setIsDay((prevIsDay) => !prevIsDay);
  };

  // Estilos do contêiner principal do botão (tdnn)
  const containerStyle = {
    margin: '0px',
    fontSize: '20%', // Diminui o tamanho da fonte
    marginTop: '5em', // Diminui a margem superior
    position: 'relative',
    height: '10em', // Diminui a altura do contêiner
    width: '20em', // Diminui a largura do contêiner
    borderRadius: '10em', // Ajusta o raio do contêiner
    transition: 'all 500ms ease-in-out',
    background: isDay ? '#FFBF71' : '#423966', // Cor de fundo muda entre noite e dia
    cursor: 'pointer', // Indica que o contêiner é clicável
};

// Estilos da lua/sol (moon)
const moonStyle = {
    position: 'absolute',
    borderRadius: '50%',
    transition: 'all 400ms ease-in-out',
    top: isDay ? '3em' : '2em', // Ajusta a posição da lua ou sol
    left: isDay ? '12em' : '2em', // Posição alterada dependendo do estado
    width: isDay ? '5em' : '7em', // Diminui o tamanho do sol
    height: isDay ? '5em' : '7em', // Diminui o tamanho da lua
    background: isDay ? '#fff' : '#D9FBFF', // Cor branca para o sol, azul para a lua
    boxShadow: isDay
      ? `2em 2em 0 4em #fff inset, 0 -4em 0 -2em #fff,
         2.5em -2.5em 0 -2em #fff, 4em 0 0 -2em #fff,
         2.5em 2.5em 0 -2em #fff, 0 4em 0 -2em #fff,
         -2.5em 2.5em 0 -2em #fff, -4em 0 0 -2em #fff,
         -2.5em -2.5em 0 -2em #fff` // Estilo para o sol
      : `2em 2em 0 0em #D9FBFF inset, rgba(255, 255, 255, 0.1) 0em -5em 0 -3em,
         rgba(255, 255, 255, 0.1) 2em 5em 0 -3em, rgba(255, 255, 255, 0.1) 1em 8em 0 -3em,
         rgba(255, 255, 255, 0.1) 4em 1em 0 -3em, rgba(255, 255, 255, 0.1) 5em 5em 0 -3em,
         rgba(255, 255, 255, 0.1) 4em 8em 0 -3em, rgba(255, 255, 255, 0.1) -3em 5em 0 -3em,
         rgba(255, 255, 255, 0.1) -1em 7em 0 -3em` // Estilo para a lua
};


  return (
    <div  >
      
      {/* Ao clicar no contêiner, a função toggleTheme é chamada */}
      <div style={containerStyle} onClick={toggleTheme}>
        {/* Lua ou Sol são representados pelo mesmo div, mas com estilos dinâmicos */}
        <div style={moonStyle}></div>
        
      </div>
      {/* <p style={{color: 'white', fontWeight: 'bold' }} >Tema</p> */}
    </div>
  );
};

export default ToggleButton;
