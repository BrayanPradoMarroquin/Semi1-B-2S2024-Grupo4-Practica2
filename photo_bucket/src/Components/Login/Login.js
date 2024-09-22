// Login.js
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isCameraOn, setIsCameraOn] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogin = async () => {
    if (!username || !password) {
      alert('Por favor, complete todos los campos');
      return;
    }
    
    const loginData = {
      nombre_usuario: username,
      contrasena: password
    };

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        alert('Inicio de sesión exitoso');
      } else {
        alert('Error en el inicio de sesión');
      }
    } catch (error) {
      alert('Error en la petición: ' + error);
    }

  };

  const handleFaceRecognition = async () => {
    setIsCameraOn(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card-horizontal">
        <div className="login-section">
          <h2>Iniciar Sesión</h2>
          <div className="p-field">
            <label htmlFor="username">Nombre de Usuario</label>
            <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Ingresa tu nombre de usuario" />
          </div>
          <div className="p-field">
            <label htmlFor="password">Contraseña</label>
            <br/>
            <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Ingresa tu contraseña" feedback={false} />
          </div>
          <Button label="Iniciar Sesión" className="p-button-success" onClick={handleLogin} />
          <Button label="Registrarse" className="p-button-secondary register-btn" onClick={handleRegister} />
        </div>

        <div className="divider-vertical"></div>

        <div className="login-section">
          <h3>O inicia sesión con reconocimiento facial</h3>
          <Button label="Iniciar con reconocimiento facial" className="p-button-info" onClick={handleFaceRecognition} />
          {isCameraOn && (
            <div className="camera-container">
              <video ref={videoRef} autoPlay className="camera-feed"></video>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
