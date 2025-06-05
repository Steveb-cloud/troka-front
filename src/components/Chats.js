import React from 'react';
import '../css/Chats.css'; // Asegúrate de crear o importar este archivo

export default function Chats() {
  return (
    <aside className="chats">
      <h3 className="titulo">💬 Chats</h3>
      <ul className="lista-chats">
        <li>Usuario 1</li>
        <li>Usuario 2</li>
        <li>Usuario 3</li>
      </ul>
    </aside>
  );
}
