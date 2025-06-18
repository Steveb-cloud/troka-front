import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Header.css';

export default function Header() {
  const navigate = useNavigate();
  const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));
  const nombreUsuario = usuarioGuardado?.nombre;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  return (
    <header className="app-header">
      <h1>🌱 Troka</h1>
      <nav>
        <button className="btn-ingresar" onClick={() => navigate('/perfil')}>
          Perfil {nombreUsuario ? `(${nombreUsuario})` : ''}
        </button>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </nav>
    </header>
  );
}
