import React, { useEffect, useState } from "react";

function App() {
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/publicaciones") 
      .then((res) => res.json())
      .then((data) => setPublicaciones(data))
      .catch((err) => console.error("Error al obtener publicaciones:", err));
  }, []);

  return (
    <div>
      <h1>Publicaciones</h1>
      {publicaciones.length > 0 ? (
        <ul>
          {publicaciones.map((pub) => (
            <li key={pub.id}>
              <h2>{pub.titulo}</h2>
              <p>{pub.descripcion}</p>
              <p><strong>Categoría:</strong> {pub.categoria}</p>
              <p><strong>Usuario:</strong> {pub.id_usuario}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay publicaciones disponibles.</p>
      )}
    </div>
  );
}

export default App;
