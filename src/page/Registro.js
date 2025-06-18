import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';

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
        <div className="login-container">
            <h2>Crear cuenta</h2>
            <form onSubmit={handleRegistro}>
                <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required />
                <input type="email" placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} required />
                <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
                <input type="text" placeholder="Ubicación" value={ubicacion} onChange={e => setUbicacion(e.target.value)} required />
                <button type="submit">Registrarse</button>
                {mensaje && <p>{mensaje}</p>}
            </form>
        </div>
    );
}
