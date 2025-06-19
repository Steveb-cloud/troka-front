import React, { useEffect, useState } from 'react';
import { List, ListItemButton, ListItemText, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Chats() {
  const [amigos, setAmigos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioStr = localStorage.getItem('usuario');
    if (!usuarioStr) {
      navigate('/login');
      return;
    }

    const usuario = JSON.parse(usuarioStr);
    const usuarioActual = usuario.id_usuario;

    fetch(`http://localhost:3000/amigos/${usuarioActual}`)
      .then(res => {
        if (!res.ok) throw new Error('Error al obtener amigos');
        return res.json();
      })
      .then(data => setAmigos(data))
      .catch(err => console.error("Error al cargar amigos:", err));
  }, [navigate]);

  const abrirChat = (id_amigo) => {
    navigate(`/chat/${id_amigo}`);
  };

  return (
    <Paper elevation={3} sx={{ p: 2, minWidth: 250, mt: 2 }}>
      <Typography variant="h6" gutterBottom>💬 Chats</Typography>
      <List>
        {amigos.map(amigo => (
          <ListItemButton
            key={amigo.id_usuario}
            onClick={() => abrirChat(amigo.id_usuario)}
          >
            <ListItemText primary={amigo.nombre} />
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );
}
