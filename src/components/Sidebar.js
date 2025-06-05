import React, { useState } from 'react';
import '../css/Sidebar.css';

export default function Sidebar() {
  const [abierto, setAbierto] = useState(false);

  const toggleSidebar = () => setAbierto(!abierto);

  return (
    <div className="sidebar-wrapper">
      <div className="petalo" onClick={toggleSidebar} title="Redes sociales">
        🌐
      </div>

      {abierto && (
        <div className="social-menu">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="icon">📘</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="icon">🐦</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="icon">📸</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="icon">💼</a>
          <a href="mailto:contacto@tupagina.com" className="icon">✉️</a>
        </div>
      )}
    </div>
  );
}
