import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Chats.css';

export default function Chats() {
  const [amigos, setAmigos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener usuario guardado en localStorage
    const usuarioStr = localStorage.getItem('usuario');
    if (!usuarioStr) {
      // No hay usuario logueado, redirigir al login
      navigate('/login');
      return;
    }

    const usuario = JSON.parse(usuarioStr);
    const usuarioActual = usuario.id_usuario;

    fetch(`http://localhost:3000/amigos/${usuarioActual}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Error al obtener amigos');
        }
        return res.json();
      })
      .then(data => setAmigos(data))
      .catch(err => console.error("Error al cargar amigos:", err));
  }, [navigate]);

  const abrirChat = (id_amigo) => {
    navigate(`/chat/${id_amigo}`);
  };

  return (
    <aside className="chats">
      <h3 className="titulo">💬 Chats</h3>
      <ul className="lista-chats">
        {amigos.map(amigo => (
          <li
            key={amigo.id_usuario}
            onClick={() => abrirChat(amigo.id_usuario)}
            style={{ cursor: 'pointer' }}
          >
            {amigo.nombre}
          </li>
        ))}
      </ul>
    </aside>
  );
}
