import { useState } from 'react';
import './Unirse.css';
import { useNavigate } from "react-router-dom";

export function Unirse() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/usuarios", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.name,
          email: form.email,
          genero: "",  // Puedes agregar este campo si lo necesitas
          numeros_emergencia: [] // Puedes cambiarlo si quieres permitir agregar números aquí
        })
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Usuario registrado con éxito:", data);
        navigate("/dashboard"); // Redirigir a otra página después del registro
      } else {
        console.error("Error al registrar usuario:", data.error);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
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
          <button type="button" className="login-button" onClick={() => navigate('/login')}>
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
