import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductosPage from './pages/ProductosPage';
import CategoriasPage from './pages/CategoriasPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/productos" element={<ProductosPage />} />
      <Route path="/categorias" element={<CategoriasPage />} />
    </Routes>
  );
}

export default App;
