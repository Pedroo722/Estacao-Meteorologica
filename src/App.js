import React from 'react'; 
import { HashRouter, Routes, Route } from 'react-router-dom'; 
import './App.css'

import './styles/Home.css';

import Home from './pages/Home';

export default function App() {  
  return ( 
        <HashRouter>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </HashRouter>
  );
}
