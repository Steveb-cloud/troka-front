import React, { useEffect, useState } from 'react';

export default function Publicaciones({ categoriaId, filtro }) {
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    const url = categoriaId
      ? `http://localhost:3000/publicaciones/categoria/${categoriaId}`
      : `http://localhost:3000/publicaciones`;

    fetch(url)
      .then(res => res.json())
      .then(data => setPublicaciones(data))
      .catch(err => console.error("Error al obtener publicaciones:", err));
  }, [categoriaId]);

  const publicacionesFiltradas = publicaciones.filter((post) => {
    if (!filtro) return true;

    const texto = filtro.toLowerCase();
    return (
      post.titulo?.toLowerCase().includes(texto) ||
      post.descripcion?.toLowerCase().includes(texto)
    );
  });

  return (
    <main className="publicaciones">
      <h2>📣 Publicaciones Recientes</h2>
      {publicacionesFiltradas.length === 0 ? (
        <p>No hay publicaciones que coincidan.</p>
      ) : (
        publicacionesFiltradas.map((post, i) => (
          <div key={i} className="publicacion-card">
            <h3>{post.titulo}</h3>
            <p>{post.descripcion}</p>
            <div className="publicacion-footer">
              <span><strong>Categoría:</strong> {post.categoria_id}</span>
              <span><strong>Usuario:</strong> {post.id_usuario}</span>
            </div>
          </div>
        ))
      )}
    </main>
  );
}
