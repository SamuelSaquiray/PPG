import { useState } from 'react';
import './Unirse.css';
import { useNavigate } from "react-router-dom";

export function Unirse() {
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
      const response = await fetch("http://localhost:3000/register", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          age: 21,
          password: form.password,
          peso: 64,
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Usuario registrado con éxito");
      } else {
        alert("Error al registrar usuario: " + data.error);
      }
    } catch (error) {
      alert("Error en la solicitud: " + error);
    }
  };

  const handleLogin = async e => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginForm.email,
          password: loginForm.password,
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Inicio de sesión exitoso");
        navigate("/home"); // Redirigir a la página principal
      } else {
        alert("Error al iniciar sesión: " + data.error);
      }
    } catch (error) {
      alert("Error en la solicitud: " + error);
    }
  };

  return (
    <div className='register-container'>
      <div className='register-card'>
        <h2 className='register-title'>Registro</h2>
        <form onSubmit={handleSubmit} className='register-form'>
          <input
            type='text'
            name='name'
            placeholder='Nombre'
            value={form.name}
            onChange={handleChange}
            required
            className='register-input'
          />
          <input
            type='email'
            name='email'
            placeholder='Correo electrónico'
            value={form.email}
            onChange={handleChange}
            required
            className='register-input'
          />
          <input
            type='password'
            name='password'
            placeholder='Contraseña'
            value={form.password}
            onChange={handleChange}
            required
            className='register-input'
          />
          <button type='submit' className='register-button'>
            Registrarse
          </button>
        </form>
        
        <h2 className='login-title'>Iniciar Sesión</h2>
        <form onSubmit={handleLogin} className='login-form'>
          <input
            type='email'
            name='email'
            placeholder='Correo electrónico'
            value={loginForm.email}
            onChange={handleLoginChange}
            required
            className='login-input'
          />
          <input
            type='password'
            name='password'
            placeholder='Contraseña'
            value={loginForm.password}
            onChange={handleLoginChange}
            required
            className='login-input'
          />
          <button type='submit' className='login-button'>
            Iniciar Sesión
          </button>
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
