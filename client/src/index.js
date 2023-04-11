import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import Electric from './pages/electric.js';
import Custom from './pages/custom.js';
import Closure from './pages/closure.js';
import Borough from './pages/borough';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/electric" element={<Electric />} />
        <Route path="/custom" element={<Custom />} />
        <Route path="/closure" element={<Closure />} />
        <Route path="/borough" element={<Borough />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
); 