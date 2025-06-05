
import React, { useEffect, useState } from 'react';

export default function Publicaciones() {
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/publicaciones")
      .then(res => res.json())
      .then(data => setPublicaciones(data))
      .catch(err => console.error("Error al obtener publicaciones:", err));
  }, []);

  return (
    <main className="publicaciones">
      <h2>📣 Publicaciones Recientes</h2>
      {publicaciones.length === 0 ? (
        <p>No hay publicaciones todavía.</p>
      ) : (
        publicaciones.map((post, i) => (
          <div key={i} className="publicacion-card">
            <h3>{post.titulo}</h3>
            <p>{post.descripcion}</p>
            <div className="publicacion-footer">
              <span><strong>Categoría:</strong> {post.categoria}</span>
              <span><strong>Usuario:</strong> {post.id_usuario}</span>
            </div>
          </div>
        ))
      )}
    </main>
  );
}
