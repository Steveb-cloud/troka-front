import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Chats from '../components/Chats';
import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Divider
} from '@mui/material';
import { Home as HomeIcon, Add as AddIcon } from '@mui/icons-material';

function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [miUsuario, setMiUsuario] = useState(null);
  const [publicaciones, setPublicaciones] = useState([]);
  const [, setChats] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [esAmigo, setEsAmigo] = useState(false);
  const [reputaciones, setReputaciones] = useState([]);
  const [puntuacionNueva, setPuntuacionNueva] = useState(5);
  const [comentarioNuevo, setComentarioNuevo] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoriaId, setCategoriaId] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  const esMiPerfil = !id || (miUsuario && (id === String(miUsuario.id || miUsuario.id_usuario)));

  useEffect(() => {
    const token = localStorage.getItem('token');
    const usuarioGuardado = localStorage.getItem('usuario');
    let idUsuario = id;

    if (usuarioGuardado) {
      try {
        const parsed = JSON.parse(usuarioGuardado);
        setMiUsuario(parsed);
        if (!idUsuario) {
          idUsuario = parsed.id || parsed.id_usuario;
        }
      } catch (e) {
        console.error("Error al leer el usuario del localStorage:", e);
      }
    }

    if (!token || !idUsuario) return;

    const fetchUserData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/usuarios/${idUsuario}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsuario(res.data);
      } catch (err) {
        console.error('Error al cargar perfil:', err);
      }
    };

    const fetchPublicaciones = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/publicaciones/usuario/${idUsuario}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPublicaciones(res.data);
      } catch (err) {
        console.error('Error al cargar publicaciones:', err);
      }
    };

    const fetchChats = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/amigos/chat/${idUsuario}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setChats(res.data);
      } catch (err) {
        console.error('Error al cargar chats:', err);
      }
    };

    const fetchCategorias = async () => {
      try {
        const res = await axios.get('http://localhost:3000/categorias');
        setCategorias(res.data);
      } catch (err) {
        console.error('Error al cargar categorías:', err);
      }
    };

    const fetchReputaciones = async () => {
      try {
        const res = await axios.get('http://localhost:3000/reputaciones');
        const filtradas = res.data.filter(rep => rep.id_usuario_calificado === Number(idUsuario));
        setReputaciones(filtradas);
      } catch (err) {
        console.error('Error al obtener reputaciones:', err);
      }
    };

    fetchUserData();
    fetchPublicaciones();
    fetchChats();
    fetchCategorias();
    fetchReputaciones();
  }, [id]);

  useEffect(() => {
    const verificarAmistad = async () => {
      if (!miUsuario || !usuario) return;

      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await axios.get(`http://localhost:3000/amigos/${miUsuario.id_usuario}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const amigosIds = res.data.map(a => a.id_usuario);
        setEsAmigo(amigosIds.includes(usuario.id_usuario));
      } catch (err) {
        console.error('Error al verificar amistad:', err);
      }
    };
    verificarAmistad();
  }, [miUsuario, usuario]);

  const agregarAmigo = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token || !miUsuario) return;

      await axios.post('http://localhost:3000/amigos', {
        id_usuario: miUsuario.id || miUsuario.id_usuario,
        id_amigo: usuario.id || usuario.id_usuario
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('¡Amigo agregado con éxito!');
      setEsAmigo(true);
    } catch (error) {
      console.error('Error al agregar amigo:', error);
      alert('Error al agregar amigo');
    }
  };

  const crearPublicacion = async (e) => {
    e.preventDefault();
    if (!titulo || !descripcion || !categoriaId) return;
    try {
      const token = localStorage.getItem('token');
      if (!token || !miUsuario) return;

      await axios.post('http://localhost:3000/publicaciones', {
        id_usuario: miUsuario.id || miUsuario.id_usuario,
        titulo,
        descripcion,
        categoria_id: categoriaId,
        estado: 'activo',
        imagen_url: null,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setTitulo('');
      setDescripcion('');
      setCategoriaId('');
      setMostrarFormulario(false);

      const res = await axios.get(`http://localhost:3000/publicaciones/usuario/${miUsuario.id || miUsuario.id_usuario}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPublicaciones(res.data);
    } catch (error) {
      console.error('Error al crear publicación:', error);
    }
  };

  const enviarValoracion = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token || !miUsuario || !usuario) return;

      await axios.post('http://localhost:3000/reputaciones', {
        id_trueque: null,
        id_usuario_calificado: usuario.id_usuario,
        id_usuario_calificador: miUsuario.id_usuario,
        puntuacion: puntuacionNueva,
        comentario: comentarioNuevo
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setPuntuacionNueva(5);
      setComentarioNuevo('');

      const res = await axios.get('http://localhost:3000/reputaciones');
      const filtradas = res.data.filter(rep => rep.id_usuario_calificado === usuario.id_usuario);
      setReputaciones(filtradas);
    } catch (err) {
      console.error('Error al enviar valoración:', err);
    }
  };

  if (!usuario) {
    return (
      <Box sx={{ p: 5 }}>
        <Typography variant="h6" align="center">Cargando perfil...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#f1f8f4', minHeight: '100vh', p: 3 }}>
      <Grid container spacing={3}>
        {/* Panel izquierdo */}
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<HomeIcon />}
              onClick={() => navigate('/home')}
              sx={{ mb: 2 }}
            >
              Volver al Home
            </Button>
            <Typography variant="h5" gutterBottom>
              {esMiPerfil ? 'Mi Perfil' : `Perfil de ${usuario?.nombre}`}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography><strong>Nombre:</strong> {usuario?.nombre}</Typography>
            <Typography><strong>Email:</strong> {usuario?.email}</Typography>
            <Typography><strong>Ubicación:</strong> {usuario?.ubicacion}</Typography>

            {!esMiPerfil && !esAmigo && (
              <Button
                variant="contained"
                color="success"
                fullWidth
                sx={{ mt: 3 }}
                onClick={agregarAmigo}
              >
                Agregar como amigo
              </Button>
            )}

            {esMiPerfil && (
              <>
                <Button
                  variant="contained"
                  fullWidth
                  color="success"
                  startIcon={<AddIcon />}
                  sx={{ mt: 3 }}
                  onClick={() => setMostrarFormulario(!mostrarFormulario)}
                >
                  {mostrarFormulario ? 'Cancelar' : 'Crear Publicación'}
                </Button>

                {mostrarFormulario && (
                  <Box component="form" onSubmit={crearPublicacion} sx={{ mt: 2 }}>
                    <TextField label="Título" fullWidth required value={titulo} onChange={(e) => setTitulo(e.target.value)} sx={{ mb: 2 }} />
                    <TextField label="Descripción" fullWidth multiline rows={3} required value={descripcion} onChange={(e) => setDescripcion(e.target.value)} sx={{ mb: 2 }} />
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>Categoría</InputLabel>
                      <Select value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)} required>
                        <MenuItem value="">Selecciona una categoría</MenuItem>
                        {categorias.map((cat) => (
                          <MenuItem key={cat.id_categoria} value={cat.id_categoria}>{cat.nombre}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Button type="submit" fullWidth variant="contained" color="success">Publicar</Button>
                  </Box>
                )}
              </>
            )}
          </Paper>
        </Grid>

        {/* Publicaciones */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>Publicaciones</Typography>
            <Divider sx={{ mb: 2 }} />
            {publicaciones.length === 0 ? (
              <Typography>No hay publicaciones aún.</Typography>
            ) : (
              publicaciones.map((pub) => (
                <Paper key={pub.id_publicacion} sx={{ p: 2, mb: 2, backgroundColor: '#f9fbe7' }}>
                  <Typography variant="subtitle1">{pub.titulo}</Typography>
                  <Typography variant="body2">{pub.descripcion}</Typography>
                  <Typography variant="caption" color="text.secondary">Categoría: {pub.nombre_categoria}</Typography>
                </Paper>
              ))
            )}
          </Paper>
        </Grid>

        {/* Reputaciones */}
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            {esMiPerfil ? (
              <>
                <Typography variant="h6">Mis Reputaciones</Typography>
                <Divider sx={{ mb: 2 }} />
                {reputaciones.length === 0 ? (
                  <Typography>No tienes opiniones aún.</Typography>
                ) : (
                  reputaciones.map((rep, idx) => (
                    <Paper key={idx} sx={{ p: 1.5, my: 1, backgroundColor: '#e8f5e9' }}>
                      <Typography variant="body1"><strong>{rep.puntuacion} estrellas</strong></Typography>
                      <Typography variant="body2">{rep.comentario}</Typography>
                    </Paper>
                  ))
                )}
              </>
            ) : esAmigo ? (
              <>
                <Typography variant="h6">Califica a {usuario.nombre}</Typography>
                <Divider sx={{ mb: 2 }} />
                <Box component="form" onSubmit={enviarValoracion}>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Puntuación</InputLabel>
                    <Select value={puntuacionNueva} onChange={(e) => setPuntuacionNueva(Number(e.target.value))} required>
                      {[1, 2, 3, 4, 5].map(n => (
                        <MenuItem key={n} value={n}>{n}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    label="Comentario"
                    fullWidth
                    multiline
                    rows={3}
                    required
                    value={comentarioNuevo}
                    onChange={(e) => setComentarioNuevo(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <Button type="submit" variant="contained" fullWidth color="success">Enviar valoración</Button>
                </Box>
                {reputaciones.length > 0 && (
                  <>
                    <Typography variant="h6" sx={{ mt: 3 }}>Opiniones</Typography>
                    <Divider sx={{ mb: 2 }} />
                    {reputaciones.map((rep, idx) => (
                      <Paper key={idx} sx={{ p: 1.5, my: 1, backgroundColor: '#e0f2f1' }}>
                        <Typography variant="body1"><strong>{rep.puntuacion} estrellas</strong></Typography>
                        <Typography variant="body2">{rep.comentario}</Typography>
                      </Paper>
                    ))}
                  </>
                )}
              </>
            ) : (
              <Typography>Debes ser amigo para dejar una valoración.</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      {esMiPerfil && (
        <Box sx={{ mt: 5 }}>
          <Chats />
        </Box>
      )}
    </Box>
  );
}

export default Perfil;
