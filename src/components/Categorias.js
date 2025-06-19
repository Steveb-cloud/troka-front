import React, { useEffect, useState } from 'react';
import { List, ListItemButton, ListItemText, Paper, Typography } from '@mui/material';

export default function Categorias({ onSeleccionarCategoria }) {
  const [categorias, setCategorias] = useState([]);

  const emojiPorCategoria = {
    Ropa: "👕",
    Electrónica: "💻",
    Libros: "📚",
    Hogar: "🏠",
    Juguetes: "🧸",
    Deportes: "⚽",
    Comida: "🍎",
    Otros: "📦"
  };

  useEffect(() => {
    fetch("http://localhost:3000/categorias")
      .then(res => res.json())
      .then(data => setCategorias(data))
      .catch(err => console.error("Error al obtener categorías:", err));
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 2, minWidth: 250 }}>
      <Typography variant="h6" gutterBottom>📂 Categorías</Typography>
      <List>
        <ListItemButton onClick={() => onSeleccionarCategoria(null)}>
          <ListItemText primary="📋 Todas" />
        </ListItemButton>
        {categorias.map((cat) => (
          <ListItemButton key={cat.id_categoria} onClick={() => onSeleccionarCategoria(cat.id_categoria)}>
            <ListItemText primary={`${emojiPorCategoria[cat.nombre] || "📁"} ${cat.nombre}`} />
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );
}
