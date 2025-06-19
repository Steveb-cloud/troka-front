import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Stack
} from '@mui/material';

export default function TruequesPendientes() {
  const [trueques, setTrueques] = useState([]);
  const [publicacionesUsuario1, setPublicacionesUsuario1] = useState({});
  const [selecciones, setSelecciones] = useState({});

  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const idUsuario = usuario?.id_usuario || usuario?.id;

  useEffect(() => {
    if (!idUsuario) return;

    axios.get(`http://localhost:3000/trueques`)
      .then(res => {
        const pendientes = res.data.filter(t =>
          t.id_usuario2 === idUsuario && t.estado === 'pendiente'
        );
        setTrueques(pendientes);
      })
      .catch(err => {
        console.error('Error al cargar trueques pendientes:', err);
      });
  }, [idUsuario]);

  const cargarPublicacionesDeUsuario = async (idUsuario1, idTrueque) => {
    try {
      const res = await axios.get(`http://localhost:3000/publicaciones/usuario/${idUsuario1}`);
      setPublicacionesUsuario1(prev => ({
        ...prev,
        [idTrueque]: res.data
      }));
    } catch (error) {
      console.error("Error al cargar publicaciones del usuario:", error);
    }
  };

  const actualizarEstado = async (idTrueque, nuevoEstado) => {
    const idPublicacionElegida = selecciones[idTrueque];

    if (nuevoEstado === 'aceptado' && !idPublicacionElegida) {
      return alert("Debes seleccionar una publicación para aceptar el trueque.");
    }

    try {
      await axios.put(`http://localhost:3000/trueques/${idTrueque}`, {
        estado: nuevoEstado,
        id_publicacion_seleccionada: idPublicacionElegida || null,
      });

      setTrueques(prev => prev.filter(t => t.id_trueque !== idTrueque));
      alert(`Trueque ${nuevoEstado === 'aceptado' ? 'aceptado' : 'rechazado'}.`);
    } catch (err) {
      console.error('Error al actualizar trueque:', err);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        📦 Propuestas de Trueque Pendientes
      </Typography>

      {trueques.length === 0 ? (
        <Typography>No tienes propuestas pendientes.</Typography>
      ) : (
        <Stack spacing={2}>
          {trueques.map((t, idx) => (
            <Card key={idx} sx={{ backgroundColor: '#f1f8e9', borderRadius: 2, boxShadow: 2 }}>
              <CardContent>
                <Typography><strong>Publicación tuya:</strong> {t.titulo_publicacion2}</Typography>
                <Typography><strong>Propuesta de:</strong> {t.nombre_usuario1}</Typography>

                <Button
                  size="small"
                  variant="outlined"
                  sx={{ mt: 1, mb: 1 }}
                  onClick={() => cargarPublicacionesDeUsuario(t.id_usuario1, t.id_trueque)}
                >
                  Ver publicaciones del usuario
                </Button>

                {publicacionesUsuario1[t.id_trueque] && (
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="subtitle2">Selecciona una publicación:</Typography>
                    <Stack spacing={1}>
                      {publicacionesUsuario1[t.id_trueque].map(pub => (
                        <Button
                          key={pub.id_publicacion}
                          variant={
                            selecciones[t.id_trueque] === pub.id_publicacion
                              ? "contained"
                              : "outlined"
                          }
                          color="success"
                          onClick={() =>
                            setSelecciones(prev => ({
                              ...prev,
                              [t.id_trueque]: pub.id_publicacion
                            }))
                          }
                        >
                          {pub.titulo}
                        </Button>
                      ))}
                    </Stack>
                  </Box>
                )}
              </CardContent>

              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: '#4CAF50' }}
                  onClick={() => actualizarEstado(t.id_trueque, 'aceptado')}
                >
                  ✅ Aceptar
                </Button>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: '#f44336' }}
                  onClick={() => actualizarEstado(t.id_trueque, 'rechazado')}
                >
                  ❌ Rechazar
                </Button>
              </CardActions>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
}
