import { useState } from 'react';
import './Unirse.css';
import { useNavigate } from "react-router-dom";
export function Unirse() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Registering user:', form);
  };
  const navigate = useNavigate();
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
          <button type='submit' className='register-button' onClick={() => console.log('Registrarse')}>
            Registrarse
          </button>
          <button type="submit" className="login-button" onClick={() => console.log('iniciar sesion')}>Iniciar Sesión</button>
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
