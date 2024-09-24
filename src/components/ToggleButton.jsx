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
    margin: '0 auto',
    fontSize: '30%',
    marginTop: '10em',
    position: 'relative',
    height: '16em',
    width: '30em',
    borderRadius: '16em',
    transition: 'all 500ms ease-in-out',
    background: isDay ? '#FFBF71' : '#423966', // Cor de fundo muda entre noite e dia
    cursor: 'pointer', // Indica que o contêiner é clicável
  };

  // Estilos da lua/sol (moon)
  const moonStyle = {
    position: 'absolute',
    borderRadius: '50%',
    transition: 'all 400ms ease-in-out',
    top: isDay ? '4.5em' : '3em', // Ajusta a posição da lua ou sol
    left: isDay ? '18em' : '3em', // Posição alterada dependendo do estado
    width: isDay ? '7em' : '10em', // O tamanho do sol é menor do que o da lua
    height: isDay ? '7em' : '10em',
    background: isDay ? '#fff' : '#D9FBFF', // Cor branca para o sol, azul para a lua
    boxShadow: isDay
      ? `3em 3em 0 5em #fff inset, 0 -5em 0 -2.7em #fff,
         3.5em -3.5em 0 -3em #fff, 5em 0 0 -2.7em #fff,
         3.5em 3.5em 0 -3em #fff, 0 5em 0 -2.7em #fff,
         -3.5em 3.5em 0 -3em #fff, -5em 0 0 -2.7em #fff,
         -3.5em -3.5em 0 -3em #fff` // Estilo para o sol
      : `3em 2.5em 0 0em #D9FBFF inset, rgba(255, 255, 255, 0.1) 0em -7em 0 -4.5em,
         rgba(255, 255, 255, 0.1) 3em 7em 0 -4.5em, rgba(255, 255, 255, 0.1) 2em 13em 0 -4em,
         rgba(255, 255, 255, 0.1) 6em 2em 0 -4.1em, rgba(255, 255, 255, 0.1) 8em 8em 0 -4.5em,
         rgba(255, 255, 255, 0.1) 6em 13em 0 -4.5em, rgba(255, 255, 255, 0.1) -4em 7em 0 -4.5em,
         rgba(255, 255, 255, 0.1) -1em 10em 0 -4.5em`, // Estilo para a lua
  };

  return (
    <div>
      
      {/* Ao clicar no contêiner, a função toggleTheme é chamada */}
      <div style={containerStyle} onClick={toggleTheme}>
        {/* Lua ou Sol são representados pelo mesmo div, mas com estilos dinâmicos */}
        <div style={moonStyle}></div>
      </div>
    </div>
  );
};

export default ToggleButton;
