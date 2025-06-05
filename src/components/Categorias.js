import React from 'react';
import '../css/Categorias.css'; 

export default function Categorias() {
  return (
    <aside className="categorias">
      <h3 className="titulo">📂 Categorías</h3>
      <ul className="lista-categorias">
        <li>👕 Ropa</li>
        <li>💻 Electrónica</li>
        <li>📚 Libros</li>
        <li>🏠 Hogar</li>
      </ul>
    </aside>
  );
}
