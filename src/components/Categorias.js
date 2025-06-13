import React, { useEffect, useState } from 'react';
import '../css/Categorias.css';

export default function Categorias({ onSeleccionarCategoria }) {
  const [categorias, setCategorias] = useState([]);

  const emojiPorCategoria = {
    Ropa: "👕",
    Electrónica: "💻",
    Libros: "📚",
    Hogar: "🏠",
    Juguetes: "🧸",
    Deportes: "⚽",
    Comida: "🍎",
    Otros: "📦"
  };

  useEffect(() => {
    fetch("http://localhost:3000/categorias")
      .then(res => res.json())
      .then(data => setCategorias(data))
      .catch(err => console.error("Error al obtener categorías:", err));
  }, []);

  return (
    <aside className="categorias">
      <h3 className="titulo">📂 Categorías</h3>
      <ul className="lista-categorias">
        <li onClick={() => onSeleccionarCategoria(null)}>📋 Todas</li>
        {categorias.map((cat) => (
          <li key={cat.id_categoria} onClick={() => onSeleccionarCategoria(cat.id_categoria)}>
            {emojiPorCategoria[cat.nombre] || "📁"} {cat.nombre}
          </li>
        ))}
      </ul>
    </aside>
  );
}

