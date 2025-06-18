import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:3000/login', {
        usuario,
        password,
      });

      console.log('Respuesta login:', res.data);

      if (res.data.token && res.data.usuario) {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');

        localStorage.setItem('token', res.data.token);
        localStorage.setItem('usuario', JSON.stringify(res.data.usuario));

        navigate('/home');
      } else {
        setError('Respuesta inválida del servidor');
      }
    } catch (err) {
      console.error('Error al iniciar sesión:', err.response || err.message);
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Ingresar</button>
      </form>
      <button onClick={() => navigate('/registro')} className="btn-registrarse">
        Crear cuenta
      </button>
    </div>
  );
};

export default Login;
