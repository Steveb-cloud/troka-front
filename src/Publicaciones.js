import React, { useEffect, useState } from 'react';

const Publicaciones = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/publicaciones') 
      .then(res => {
        if (!res.ok) {
          throw new Error('Error al obtener las publicaciones');
        }
        return res.json();
      })
      .then(data => setPosts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Publicaciones</h2>
      {posts.length === 0 ? (
        <p>No hay publicaciones</p>
      ) : (
        posts.map((post, i) => (
          <div key={i} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <h3>{post.titulo}</h3>
            <p>{post.descripcion}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Publicaciones;
