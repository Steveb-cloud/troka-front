import React from "react";
import "../index.css";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Categorias from "../components/Categorias";
import Publicaciones from "../components/Publicaciones";
import Chats from "../components/Chats";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="app-container">
      <Header />
      <div className="layout">
        <Sidebar />
        <Categorias />
        <Publicaciones />
        <Chats />
      </div>
      <Footer />
    </div>
  );
}

export default Home;