import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [miUsuario, setMiUsuario] = useState(null);
  const [publicaciones, setPublicaciones] = useState([]);
  const [chats, setChats] = useState([]);
  const { id } = useParams();

  // Estados para crear publicación (tu formulario)
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [categorias, setCategorias] = useState([]);

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

    // Cargar datos usuario
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

    // Cargar publicaciones de usuario
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

    // Cargar chats de amigos
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

    fetchUserData();
    fetchPublicaciones();
    fetchChats();

    // Cargar categorías para formulario
    const fetchCategorias = async () => {
      try {
        const res = await axios.get('http://localhost:3000/categorias');
        setCategorias(res.data);
      } catch (err) {
        console.error('Error al cargar categorías:', err);
      }
    };
    fetchCategorias();
  }, [id]);

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
    } catch (error) {
      console.error('Error al agregar amigo:', error);
      alert('Error al agregar amigo');
    }
  };

  const crearPublicacion = async (e) => {
    e.preventDefault();

    if (!titulo || !descripcion || !categoriaId) {
      alert('Por favor completa todos los campos.');
      return;
    }

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

      alert('¡Publicación creada con éxito!');
      setTitulo('');
      setDescripcion('');
      setCategoriaId('');
      setMostrarFormulario(false);

      // Recargar publicaciones luego de crear
      const res = await axios.get(`http://localhost:3000/publicaciones/usuario/${miUsuario.id || miUsuario.id_usuario}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPublicaciones(res.data);

    } catch (error) {
      console.error('Error al crear publicación:', error);
      alert('Error al crear publicación');
    }
  };

  if (!usuario) return <p>Cargando perfil...</p>;

  const esMiPerfil = !id || (miUsuario && (id === String(miUsuario.id || miUsuario.id_usuario)));

  return (
    <div className="perfil-container">
      <h2>{esMiPerfil ? 'Mi Perfil' : `Perfil de ${usuario.nombre}`}</h2>
      <p><strong>Nombre:</strong> {usuario.nombre}</p>
      <p><strong>Email:</strong> {usuario.email}</p>
      <p><strong>Ubicación:</strong> {usuario.ubicacion}</p>

      {!esMiPerfil && (
        <button onClick={agregarAmigo}>Agregar como amigo</button>
      )}

      {esMiPerfil && (
        <>
          <button onClick={() => setMostrarFormulario(!mostrarFormulario)}>
            {mostrarFormulario ? 'Cancelar' : 'Crear Publicación'}
          </button>

          {mostrarFormulario && (
            <form onSubmit={crearPublicacion} style={{ marginTop: '1rem' }}>
              <div>
                <label>Título:</label><br />
                <input 
                  type="text" 
                  value={titulo} 
                  onChange={e => setTitulo(e.target.value)} 
                  required 
                />
              </div>
              <div>
                <label>Descripción:</label><br />
                <textarea 
                  value={descripcion} 
                  onChange={e => setDescripcion(e.target.value)} 
                  required 
                />
              </div>
              <div>
                <label>Categoría:</label><br />
                <select 
                  value={categoriaId} 
                  onChange={e => setCategoriaId(e.target.value)} 
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  {categorias.map(cat => (
                    <option key={cat.id_categoria} value={cat.id_categoria}>
                      {cat.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" style={{ marginTop: '1rem' }}>Publicar</button>
            </form>
          )}
        </>
      )}

      {/* Mostrar publicaciones del usuario */}
      <section style={{ marginTop: '2rem' }}>
        <h3>Mis Publicaciones</h3>
        {publicaciones.length === 0 ? (
          <p>No tienes publicaciones aún.</p>
        ) : (
          publicaciones.map(pub => (
            <div key={pub.id_publicacion} className="publicacion-card" style={{border: '1px solid #ccc', padding: '10px', marginBottom: '10px'}}>
              <h4>{pub.titulo}</h4>
              <p>{pub.descripcion}</p>
              <small><strong>Categoría:</strong> {pub.nombre_categoria}</small>
            </div>
          ))
        )}
      </section>

      {/* Mostrar chats */}
      <section style={{ marginTop: '2rem' }}>
        <h3>Chats con Amigos</h3>
        {chats.length === 0 ? (
          <p>No tienes chats activos.</p>
        ) : (
          chats.map(chat => (
            <div key={chat.id_chat} className="chat-card" style={{border: '1px solid #aaa', padding: '8px', marginBottom: '8px'}}>
              <p><strong>Con:</strong> {chat.nombre_amigo}</p>
              <p><strong>Último mensaje:</strong> {chat.ultimo_mensaje}</p>
              <small><em>{new Date(chat.fecha_ultimo_mensaje).toLocaleString()}</em></small>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default Perfil;
