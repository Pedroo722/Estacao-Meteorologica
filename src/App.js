import React from 'react'; 
import { HashRouter, Routes, Route } from 'react-router-dom'; 
import './App.css'

import './styles/Home.css';
import './styles/Graphs.css';
import './styles/StationList.css';

import DashBar from './components/DashBar.jsx';
import Home from './pages/Home.jsx';
import Graphs from './pages/Graphs.jsx';
import Info from './pages/Info.jsx';


export default function App() {  
  return ( 
        <HashRouter>
          <DashBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='graphs' element={<Graphs />} />
            <Route path='info' element={<Info />} />
            {/* <Route path="/stations/:stationCode" element={<Station />} />  */}
          </Routes>
        </HashRouter>
  );
}
