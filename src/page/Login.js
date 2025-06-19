import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Stack,
} from '@mui/material';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:3000/login', {
        usuario,
        password,
      });

      if (res.data.token && res.data.usuario) {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');

        localStorage.setItem('token', res.data.token);
        localStorage.setItem('usuario', JSON.stringify(res.data.usuario));

        navigate('/home');
      } else {
        setError('Respuesta inválida del servidor');
      }
    } catch (err) {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: '#e8f5e9' }} 
    >
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          width: 350,
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: 'white',
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h5" align="center" color="green">
            🌿 Iniciar sesión
          </Typography>

          <TextField
            label="Usuario"
            variant="outlined"
            fullWidth
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
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

          {error && <Alert severity="error">{error}</Alert>}

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
            Ingresar
          </Button>

          <Button
            variant="outlined"
            fullWidth
            onClick={() => navigate('/registro')}
            sx={{
              borderColor: '#4CAF50',
              color: '#4CAF50',
              '&:hover': {
                borderColor: '#388E3C',
                color: '#388E3C',
              },
            }}
          >
            Crear cuenta
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Login;
