import React, { useState } from 'react';
import "../index.css";

function Busqueda({ onBuscar }) {
  const [query, setQuery] = useState('');

  const handleBuscar = () => {
    onBuscar(query);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Buscar publicaciones..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: '8px', width: '250px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <button onClick={handleBuscar} style={{ marginLeft: '10px', padding: '8px 12px' }}>
        Buscar
      </button>
    </div>
  );
}

export default Busqueda;
