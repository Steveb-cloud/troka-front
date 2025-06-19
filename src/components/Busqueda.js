import React, { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';

function Busqueda({ onBuscar }) {
  const [query, setQuery] = useState('');

  const handleBuscar = () => {
    onBuscar(query);
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
      <TextField
        label="Buscar publicaciones..."
        variant="outlined"
        size="small"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ width: 300 }}
      />
      <Button variant="contained" color="success" onClick={handleBuscar}>
        Buscar
      </Button>
    </Stack>
  );
}

export default Busqueda;
