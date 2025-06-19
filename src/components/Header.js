import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

export default function Header() {
  const navigate = useNavigate();
  const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));
  const nombreUsuario = usuarioGuardado?.nombre;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  return (
    <AppBar position="static" color="success">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/home')}>
          🌱 Troka
        </Typography>
        <Box>
          <Button color="inherit" onClick={() => navigate('/perfil')}>
            Perfil {nombreUsuario ? `(${nombreUsuario})` : ''}
          </Button>
          <Button color="inherit" onClick={() => navigate('/trueques-pendientes')}>
            Propuestas de Trueque
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
