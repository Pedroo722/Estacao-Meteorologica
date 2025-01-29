// import React from 'react';
// import Terra from '../imgs/image.png'

// const Info = () => {

//   return (
//     // <div className="container1" style={{ display: 'flex', height: '100vh', width: '100%' }}>
//       <div className="context" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '20px', gap: '20px' }} >
//         <h1 style={{fontSize: '40px'}} >Aqui terá algumas informações sobre as variáveis climatológicas</h1>
//         <img className="img-terra" src={Terra} alt="Descrição da imagem" style={{height: '300px', width: '300px'}}/>
//       </div>
//     // </div>
//   );
// };

// export default Info;
import React from 'react';
import Terra from '../imgs/image.png';
import '../styles/Info.css'

const Info = ({ isMinimized }) => {
  return (
    <div style={{ minHeight: '100vh', padding: '20px', }}>
      <div className={`context ${isMinimized ? 'context-minimized' : 'context-maximized'}`}>
          <h1 className="title-header" >Aqui terá algumas informações sobre as variáveis climatológicas</h1>
          <img className="img-terra" src={Terra} alt="Descrição da imagem" />
      </div>

      <div className={`container1 ${isMinimized ? 'minimized' : 'maximized'}`}>
      <div className="card">
  <h3 className="title">Precipitação Total (mm)</h3>
  <p className="description">
    É a medida total de precipitação (chuva). A precipitação total é a soma de toda a água que cai sobre a superfície da Terra, seja na forma de chuva, granizo, neve ou orvalho. A medição da precipitação é crucial para entender padrões climáticos, agricultura, disponibilidade de água e controle de inundações.
  </p>
</div>
<div className="card">
  <h3 className="title">Pressão Atmosférica ao Nível da Estação (mb/hPa)</h3>
  <p className="description">
    É a medida média da pressão atmosférica, também ao nível da estação. A pressão atmosférica é o peso do ar exercido sobre a superfície da Terra e pode variar com a altitude e as condições meteorológicas. Ela está diretamente relacionada ao clima e ao tempo, influenciando a formação de sistemas meteorológicos como frentes e ciclones.
  </p>
</div>
<div className="card">
  <h3 className="title">Radiação Global (KJ/m²)</h3>
  <p className="description">
    É a medida de toda radiação solar que chegou à superfície terrestre. A radiação solar impacta a temperatura ambiente, os processos fotossintéticos das plantas e a produção de energia solar, sendo fundamental para entender os ciclos climáticos e as mudanças ambientais.
  </p>
</div>

        
      </div>

      {/* <div className={`container1 ${isMinimized ? 'minimized' : 'maximized'}`}>
      <div className="card">
          <h3 className="title">Temperatura do Ar - Bulbo Seco (°C)</h3>
          <p className="description">É a medida média da temperatura do ar.</p>
        </div>
        <div className="card">
          <h3 className="title">Temperatura do Ponto de Orvalho (°C)</h3>
          <p className="description">Este parâmetro é calculado a partir dos valores de temperatura do ar e da umidade relativa.</p>
        </div>

        <div className="card">
          <h3 className="title">Umidade Relativa do Ar (%)</h3>
          <p className="description">É a medida da umidade relativa do ar.</p>
        </div>
      </div>

      <div className={`container1 ${isMinimized ? 'minimized' : 'maximized'}`}>
        <div className="card">
          <h3 className="title">Direção do Vento (°)</h3>
          <p className="description">É a medida em graus angulares da direção do vento (de onde o vento vem).</p>
        </div>

        <div className="card">
          <h3 className="title">Rajada Máxima do Vento (m/s)</h3>
          <p className="description">É a medida máxima da velocidade do vento.</p>
        </div>

        <div className="card">
          <h3 className="title">Velocidade do Vento (m/s)</h3>
          <p className="description">É a medida da velocidade do vento.</p>
        </div>
      </div> */}

<div className={`container1 ${isMinimized ? 'minimized' : 'maximized'}`}>
  <div className="card">
    <h3 className="title">Temperatura do Ar - Bulbo Seco (°C)</h3>
    <p className="description">
      É a medida média da temperatura do ar. A temperatura do ar afeta diretamente o conforto térmico, a saúde humana e a evaporação da água, sendo essencial para a previsão do tempo e o comportamento da atmosfera.
    </p>
  </div>
  <div className="card">
    <h3 className="title">Temperatura do Ponto de Orvalho (°C)</h3>
    <p className="description">
      Este parâmetro é calculado a partir dos valores de temperatura do ar e da umidade relativa. Ele representa a temperatura à qual o ar precisa ser resfriado para que a umidade comece a condensar, formando orvalho ou neblina, e ajuda a indicar condições de geada ou formação de nuvens.
    </p>
  </div>

  <div className="card">
    <h3 className="title">Umidade Relativa do Ar (%)</h3>
    <p className="description">
      É a medida da umidade relativa do ar. A umidade relativa é a quantidade de vapor d'água presente no ar, expressa como uma porcentagem da quantidade máxima que o ar pode conter a uma determinada temperatura. Ela influencia o conforto humano, a evaporação e a formação de precipitações.
    </p>
  </div>
</div>

<div className={`container1 ${isMinimized ? 'minimized' : 'maximized'}`}>
  <div className="card">
    <h3 className="title">Direção do Vento (°)</h3>
    <p className="description">
      É a medida em graus angulares da direção do vento (de onde o vento vem). A direção do vento é crucial para a previsão do tempo, dispersão de poluentes e navegação marítima e aérea.
    </p>
  </div>

  <div className="card">
    <h3 className="title">Rajada Máxima do Vento (m/s)</h3>
    <p className="description">
      É a medida máxima da velocidade do vento. As rajadas de vento podem ser muito mais altas do que a velocidade média do vento e indicam condições de tempestades ou frentes meteorológicas intensas.
    </p>
  </div>

  <div className="card">
    <h3 className="title">Velocidade do Vento (m/s)</h3>
    <p className="description">
      É a medida da velocidade do vento. A velocidade do vento afeta desde a sensação térmica até a erosão do solo, o transporte de poluentes e o impacto de tempestades, sendo um fator importante para muitas atividades humanas.
    </p>
  </div>
</div>

      
    </div>
  );
};

export default Info;
