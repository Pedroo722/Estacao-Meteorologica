import React, { useState } from 'react'; 
import { HashRouter, Routes, Route } from 'react-router-dom'; 
import './App.css';

import './styles/Home.css';
import './styles/Graphs.css';
import './styles/StationList.css';

import DashBar from './components/DashBar.jsx';
import Home from './pages/Home.jsx';
import Graphs from './pages/Graphs.jsx';
import Info from './pages/Info.jsx';


export default function App() {  
  const [isMinimized, setIsMinimized] = useState(true);

  // Função para alternar entre minimizado e expandido
  const toggleDash = () => {
    setIsMinimized(!isMinimized);
  };

  return ( 
    <div className={`app-container ${isMinimized ? 'dash-minimized' : 'dash-expanded'}`}>
      <HashRouter>
        {/* Passando toggleDash e isMinimized como props para o DashBar */}
        <DashBar toggleDash={toggleDash} isMinimized={isMinimized} />
        <div className="content">
          <Routes>
            <Route path='/' element={<Home isMinimized={isMinimized} />} />
            <Route path='graphs' element={<Graphs />} />
            <Route path='info' element={<Info />} />
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
}
