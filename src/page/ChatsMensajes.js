import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import "../css/ChatsMensajes.css";

export default function ChatsMensajes() {
  const { id_amigo } = useParams();
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState("");

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const usuarioActual = usuario?.id_usuario;

  useEffect(() => {
    if (!usuarioActual) return;
    fetch(`http://localhost:3000/mensajes/${usuarioActual}/${id_amigo}`)
      .then(res => res.json())
      .then(data => setMensajes(data))
      .catch(err => console.error("Error al cargar mensajes:", err));
  }, [id_amigo, usuarioActual]);

  const enviarMensaje = () => {
    if (nuevoMensaje.trim() === "") return;

    fetch(`http://localhost:3000/api/mensajes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_emisor: usuarioActual,
        id_receptor: id_amigo,
        contenido: nuevoMensaje,
      }),
    }).then(() => {
      setMensajes([...mensajes, {
        id_emisor: usuarioActual,
        contenido: nuevoMensaje,
        fecha_envio: new Date().toISOString()
      }]);
      setNuevoMensaje("");
    });
  };

  return (
    <div className="chat-window">
      <h2 className="chat-title">💬 Chat con usuario #{id_amigo}</h2>
      <div className="mensajes">
        {mensajes.map((msg, idx) => (
          <div key={idx} className={msg.id_emisor === usuarioActual ? "msg-own" : "msg-friend"}>
            <p>{msg.contenido}</p>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={nuevoMensaje}
          onChange={(e) => setNuevoMensaje(e.target.value)}
          placeholder="Escribe un mensaje..."
        />
        <button onClick={enviarMensaje}>Enviar</button>
      </div>
    </div>
  );
}
