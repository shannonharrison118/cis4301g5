import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import About from './pages/about.js';
import Custom from './pages/custom.js';
import Generate from './pages/generate.js';
import Graph from './pages/graph';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/customize" element={<Custom />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/graph" element={<Graph />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
); 