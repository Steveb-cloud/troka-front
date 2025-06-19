import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// MUI
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Stack,
} from '@mui/material';

export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleRegistro = async (e) => {
    e.preventDefault();
    setMensaje('');

    try {
      await axios.post('http://localhost:3000/usuarios', {
        nombre,
        email,
        password,
        ubicacion,
      });
      setMensaje('✅ Usuario registrado con éxito');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      console.error('❌ Error al registrar:', err);
      setMensaje('Error al registrar usuario');
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: '#e8f5e9' }} // Verde claro de fondo
    >
      <Box
        component="form"
        onSubmit={handleRegistro}
        sx={{
          width: 400,
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: 'white',
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h5" align="center" color="green">
            🌱 Crear cuenta
          </Typography>

          <TextField
            label="Nombre"
            variant="outlined"
            fullWidth
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <TextField
            label="Correo electrónico"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <TextField
            label="Ubicación"
            variant="outlined"
            fullWidth
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            required
          />

          {mensaje && (
            <Alert severity={mensaje.includes('✅') ? 'success' : 'error'}>
              {mensaje}
            </Alert>
          )}

          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{
              backgroundColor: '#4CAF50',
              '&:hover': {
                backgroundColor: '#388E3C',
              },
            }}
          >
            Registrarse
          </Button>

          <Button
            variant="text"
            fullWidth
            onClick={() => navigate('/login')}
            sx={{ color: '#4CAF50' }}
          >
            ¿Ya tienes cuenta? Inicia sesión
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
