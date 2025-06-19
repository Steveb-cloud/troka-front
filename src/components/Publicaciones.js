import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

export default function Publicaciones({ categoriaId, filtro }) {
  const [publicaciones, setPublicaciones] = useState([]);
  const [miPublicacionId, setMiPublicacionId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const url = categoriaId
      ? `http://localhost:3000/publicaciones/categoria/${categoriaId}`
      : `http://localhost:3000/publicaciones`;

    fetch(url)
      .then(res => res.json())
      .then(data => setPublicaciones(data))
      .catch(err => console.error("Error al obtener publicaciones:", err));

    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario) {
      fetch(`http://localhost:3000/publicaciones/usuario/${usuario.id || usuario.id_usuario}`)
        .then(res => res.json())
        .then(data => {
          if (data.length > 0) setMiPublicacionId(data[0].id_publicacion);
        })
        .catch(err => console.error('Error al cargar mis publicaciones', err));
    }
  }, [categoriaId]);

  const publicacionesFiltradas = publicaciones.filter((post) => {
    if (!filtro) return true;

    const texto = filtro.toLowerCase();
    return (
      post.titulo?.toLowerCase().includes(texto) ||
      post.descripcion?.toLowerCase().includes(texto)
    );
  });

  const proponerTrueque = (id_publicacion2, id_usuario2) => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (!usuario) {
      alert("Debes estar logueado para proponer un trueque");
      navigate('/login');
      return;
    }
    if (!miPublicacionId) {
      alert("Debes tener al menos una publicación propia para hacer trueque");
      return;
    }

    fetch('http://localhost:3000/trueques', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_usuario1: usuario.id || usuario.id_usuario,
        id_usuario2,
        id_publicacion1: miPublicacionId,
        id_publicacion2,
        estado: 'pendiente'
      })
    })
      .then(res => {
        if (res.ok) {
          alert('✅ Trueque propuesto con éxito, esperando confirmación del otro usuario');
        } else {
          alert('❌ Error al proponer trueque');
        }
      })
      .catch(err => {
        console.error('Error al proponer trueque:', err);
        alert('Error al proponer trueque');
      });
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>📣 Publicaciones Recientes</Typography>

      {publicacionesFiltradas.length === 0 ? (
        <Typography>No hay publicaciones que coincidan.</Typography>
      ) : (
        publicacionesFiltradas.map((post, i) => {
          const usuario = JSON.parse(localStorage.getItem('usuario'));
          const idUsuarioActual = usuario?.id || usuario?.id_usuario;
          const esPropia = post.id_usuario === idUsuarioActual;

          return (
            <Card key={i} sx={{ mb: 2, borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6">{post.titulo}</Typography>
                <Typography>{post.descripcion}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Categoría: {post.nombre_categoria}
                </Typography>

                <Button
                  onClick={() => navigate(`/perfil/${post.id_usuario}`)}
                  sx={{ mt: 1 }}
                >
                  👤 {post.nombre_usuario}
                </Button>

                {!esPropia && (
                  <Button
                    onClick={() => proponerTrueque(post.id_publicacion, post.id_usuario)}
                    variant="contained"
                    color="success"
                    sx={{ mt: 1, ml: 2 }}
                  >
                    Proponer Trueque
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })
      )}
    </Box>
  );
}
