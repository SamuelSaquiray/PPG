import { useState } from 'react';
import './Unirse.css';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext"; // Importa el contexto


export function Unirse() {
  const { setUserId } = useAuth(); // Obtiene el setter del contexto
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLoginChange = e => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await fetch("https://api-lh8x.onrender.com/register", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registro exitoso");
        setUserId(data.user.id);
        navigate("/RegistroSecundario");
      } else {
        alert("Error en el registro: " + data.message);
      }
    } catch (error) {
      alert("Error en la solicitud: " + error.message);
    }
  };

  const handleLogin = async e => {
    e.preventDefault();

    try {
      const response = await fetch("https://api-lh8x.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm)
      });

      const data = await response.json();

      if (response.ok) {
        setUserId(data.user.id);
        alert("Login exitoso");
        navigate("/");
      } else {
        alert("Error en el login: " + data.message);
      }
    } catch (error) {
      alert("Error en la solicitud: " + error.message);
    }
  };

  return (
    <div className='register-container'>
    <div className='register-card'>
      <h2 className='register-title'>Registro</h2>
      <form onSubmit={handleSubmit} className='register-form'>
        <input type="text" name="name" placeholder="Nombre" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
        <button type="submit" className='register-button' >Registrarse</button>
      </form>
      <p className='o'>o</p>
      <h2 className='login-title'>Login</h2>
      <form onSubmit={handleLogin} className='login-form'>
        <input type="email" name="email" placeholder="Email" onChange={handleLoginChange} required />
        <input type="password" name="password" placeholder="Contraseña" onChange={handleLoginChange} required />
        <button type="submit" className='login-button'>Iniciar sesión</button>
      </form>
      <div className="back-button-container">
        <button onClick={() => navigate(-1)} className="back-button">
          {"< Regresar"}
        </button>
        </div>
    </div>
  </div>
  );
}
