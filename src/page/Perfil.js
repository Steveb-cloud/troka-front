import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Perfil() {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            const id = localStorage.getItem('id_usuario');

            if (!token || !id) return;

            try {
                const res = await axios.get(`http://localhost:3000/usuarios/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsuario(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUserData();
    }, []);

    if (!usuario) return <p>Cargando perfil...</p>;

    return (
        <div className="perfil-container">
            <h2>Mi Perfil</h2>
            <p><strong>Nombre:</strong> {usuario.nombre}</p>
            <p><strong>Email:</strong> {usuario.email}</p>
            {/* Agrega más datos si los tienes */}
        </div>
    );
}

export default Perfil;
