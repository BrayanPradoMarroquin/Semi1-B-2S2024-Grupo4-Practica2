// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Login/Login'
import Registro from './Components/Registro/Registro'
import 'primereact/resources/themes/saga-blue/theme.css';  // Tema Saga Blue
import 'primereact/resources/primereact.min.css';  // Estilos principales de PrimeReact
import 'primeicons/primeicons.css';  // Iconos de PrimeReact

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registro />} />
      </Routes>
    </Router>
  );
}

export default App;
