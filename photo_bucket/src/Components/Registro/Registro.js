// Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import "./Registro.css"; // Archivo CSS para personalización

function Registro() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword || !profileImage) {
      alert("Por favor no dejes campos vacíos");
      return;
    }

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      // Subir la imagen de perfil primero
      const imageUploadData = new FormData();
      imageUploadData.append("file", profileImage);

      const uploadResponse = await fetch(
        "http://balanceadorpractica2-564007876.us-east-1.elb.amazonaws.com/subir_perfil",
        {
          method: "POST",
          body: imageUploadData,
        }
      );

      if (!uploadResponse.ok) {
        alert("Error al subir la imagen de perfil");
        return;
      }

      const uploadResult = await uploadResponse.json();
      const uploadedImageUrl = uploadResult.url; // Extraer la URL de la imagen desde la respuesta JSON

      // Construir el formData con la URL de la imagen subida
      const formData = {
        correo_electronico: email,
        contrasena: password,
        nombre_usuario: username,
        url_imagen_perfil: uploadedImageUrl, // Usar la URL de la imagen subida
        url_imagen_reconocimiento_facial: "null",
        creado_en: new Date(),
        actualizado_en: new Date(),
      };

      // Enviar los datos del formulario al backend
      const response = await fetch(
        "http://balanceadorpractica2-564007876.us-east-1.elb.amazonaws.com/registro",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Usuario registrado con éxito");
        navigate("login");
      } else {
        console.error("Error al registrar el usuario");
      }
    } catch (error) {
      console.error("Error en la petición:", error);
    }
  };

  const onProfileImageUpload = (event) => {
    const file = event.files[0];
    setProfileImage(file);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Registro de Usuario</h2>
        <div className="p-field">
          <label htmlFor="username">Nombre de Usuario</label>
          <InputText
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingresa tu nombre de usuario"
          />
        </div>
        <div className="p-field">
          <label htmlFor="email">Correo Electrónico</label>
          <InputText
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu correo electrónico"
          />
        </div>
        <div className="p-field">
          <label htmlFor="password">Contraseña</label>
          <Password
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
            feedback={false}
          />
        </div>
        <div className="p-field">
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <Password
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repite tu contraseña"
            feedback={false}
          />
        </div>
        <div className="p-field">
          <label htmlFor="profileImage">Imagen de Perfil</label>
          <FileUpload
            name="profileImage"
            accept="image/*"
            maxFileSize={1000000}
            customUpload={true}
            auto
            onUpload={onProfileImageUpload}
          />
        </div>
        <Button
          label="Listo!"
          className="p-button-success"
          onClick={handleRegister}
        />
      </div>
    </div>
  );
}

export default Registro;
