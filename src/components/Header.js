import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Tooltip } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Header() {
  const navigate = useNavigate();
  const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));
  const nombreUsuario = usuarioGuardado?.nombre || "Usuario";

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  return (
    <AppBar position="static" color="success" sx={{ boxShadow: 3 }}>
      <Toolbar>
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 'bold', cursor: 'pointer' }}
          onClick={() => navigate('/home')}
        >
          🌱 Troka
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Tooltip title="Perfil">
            <Button color="inherit" onClick={() => navigate('/perfil')} startIcon={<AccountCircleIcon />}>
              {nombreUsuario}
            </Button>
          </Tooltip>
          <Button color="inherit" onClick={() => navigate('/trueques-pendientes')}>
            Trueques
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
