import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  TextField,
  Stack,
  Paper,
} from "@mui/material";

export default function ChatsMensajes() {
  const { id_amigo } = useParams();
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [nombreAmigo, setNombreAmigo] = useState("");
  const mensajesRef = useRef(null);
  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const usuarioActual = usuario?.id_usuario;

  const scrollToBottom = () => {
    if (mensajesRef.current) {
      mensajesRef.current.scrollTop = mensajesRef.current.scrollHeight;
    }
  };

  const cargarMensajes = useCallback(() => {
    if (!usuarioActual || !id_amigo) return;
    fetch(`http://localhost:3000/mensajes/${usuarioActual}/${id_amigo}`)
      .then(res => res.json())
      .then(data => {
        setMensajes(data);
        scrollToBottom();
      })
      .catch(err => console.error("Error al cargar mensajes:", err));
  }, [usuarioActual, id_amigo]);

  const cargarNombreAmigo = useCallback(() => {
    fetch(`http://localhost:3000/usuarios/${id_amigo}`)
      .then(res => res.json())
      .then(data => setNombreAmigo(data.nombre))
      .catch(err => console.error("Error al obtener nombre del amigo:", err));
  }, [id_amigo]);

  useEffect(() => {
    cargarMensajes();
    cargarNombreAmigo();

    const intervalo = setInterval(() => {
      cargarMensajes();
    }, 5000);

    return () => clearInterval(intervalo);
  }, [cargarMensajes, cargarNombreAmigo]);

  const enviarMensaje = () => {
    if (nuevoMensaje.trim() === "") return;

    fetch(`http://localhost:3000/mensajes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_emisor: usuarioActual,
        id_receptor: id_amigo,
        contenido: nuevoMensaje,
      }),
    }).then(() => {
      setNuevoMensaje("");
      cargarMensajes();
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button variant="outlined" color="success" onClick={() => navigate("/home")}>⬅ Home</Button>
        <Button variant="outlined" color="success" onClick={() => navigate(-1)}>🔙 Volver</Button>
      </Stack>

      <Typography variant="h5" gutterBottom>
        💬 Chat con{' '}
        <span
          style={{ cursor: "pointer", textDecoration: "underline", color: "#2e7d32" }}
          onClick={() => navigate(`/perfil/${id_amigo}`)}
        >
          {nombreAmigo || `usuario #${id_amigo}`}
        </span>
      </Typography>

      <Paper
        elevation={3}
        sx={{ maxHeight: 400, overflowY: "auto", p: 2, mb: 2, backgroundColor: "#e8f5e9" }}
        ref={mensajesRef}
      >
        <Stack spacing={1}>
          {mensajes.map((msg, idx) => (
            <Box
              key={idx}
              alignSelf={msg.id_emisor === usuarioActual ? "flex-end" : "flex-start"}
              sx={{
                backgroundColor: msg.id_emisor === usuarioActual ? "#c8e6c9" : "#a5d6a7",
                p: 1.5,
                borderRadius: 2,
                maxWidth: "70%"
              }}
            >
              <Typography>{msg.contenido}</Typography>
              <Typography variant="caption" display="block" align="right">
                {new Date(msg.fecha_envio).toLocaleTimeString()}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Paper>

      <Stack direction="row" spacing={2}>
        <TextField
          fullWidth
          label="Escribe un mensaje..."
          variant="outlined"
          value={nuevoMensaje}
          onChange={(e) => setNuevoMensaje(e.target.value)}
        />
        <Button variant="contained" color="success" onClick={enviarMensaje}>
          Enviar
        </Button>
      </Stack>
    </Box>
  );
}


