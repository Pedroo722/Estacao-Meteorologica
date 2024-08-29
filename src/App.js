import React from 'react'; 
import { HashRouter, Routes, Route } from 'react-router-dom'; 
import './App.css'

import './styles/Home.css';
import './styles/StationList.css';
import './styles/Station.css';

import Home from './pages/Home';
import Station from './pages/Station.jsx';

export default function App() {  
  return ( 
        <HashRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/stations/:stationCode" element={<Station />} /> 
          </Routes>
        </HashRouter>
  );
}
