import React from 'react'; 
import { HashRouter, Routes, Route } from 'react-router-dom'; 
import './App.css'

import './styles/Home.css';
import './styles/StationList.css';

import Home from './pages/Home';
import StationList from './pages/StationList.jsx';

export default function App() {  
  return ( 
        <HashRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/stations/:stateId" element={<StationList />} /> 
          </Routes>
        </HashRouter>
  );
}
