import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import Header from "../components/Header";
import Categorias from "../components/Categorias";
import Publicaciones from "../components/Publicaciones";
import Chats from "../components/Chats";
import Footer from "../components/Footer";
import Busqueda from "../components/Busqueda";

export default function Home() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [filtroBusqueda, setFiltroBusqueda] = useState("");

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#e8f5e9" }}>
      <Header />

      {/* Container expandido */}
      <Container maxWidth={false} sx={{ mt: 2, px: 4 }}>
        {/* Contenedor principal con flex */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "flex-start",
            height: "calc(100vh - 120px)", 
          }}
        >
          {/* Categorías */}
          <Box
            sx={{
              flex: "1 1 25%",
              position: "sticky",
              top: 80,
              maxHeight: "calc(100vh - 80px)",
              // Elimina scroll interno aquí:
              // overflowY: "auto",
            }}
          >
            <Categorias onSeleccionarCategoria={setCategoriaSeleccionada} />
          </Box>

          {/* Publicaciones */}
          <Box
            sx={{
              flex: "1 1 50%",
              display: "flex",
              flexDirection: "column",
              minWidth: 0,
              maxHeight: "calc(90vh - 80px)", 
            }}
          >
            <Box
              sx={{
                position: "sticky",
                top: 80,
                backgroundColor: "#e8f5e9",
                zIndex: 10,
                mb: 2,
                py: 1,
              }}
            >
              <Busqueda onBuscar={setFiltroBusqueda} />
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                overflowY: "auto",  // Sólo aquí scroll
              }}
            >
              <Publicaciones
                categoriaId={categoriaSeleccionada}
                filtro={filtroBusqueda}
              />
            </Box>
          </Box>

          {/* Chats */}
          <Box
            sx={{
              flex: "1 1 25%",
              position: "sticky",
              top: 80,
              maxHeight: "calc(100vh - 80px)",
              // Elimina scroll interno aquí:
              // overflowY: "auto",
            }}
          >
            <Chats />
          </Box>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}
