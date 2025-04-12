import React, { useState } from 'react';
import axios from 'axios';

function CreateChatRoomForm({ onRoomCreated }) {
  const [roomName, setRoomName] = useState('');
  const [message, setMessage] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/chat-rooms/create', { roomName });
      setMessage(`✅ Salle "${roomName}" créée avec succès`);
      setRoomName('');
      onRoomCreated(); // Actualise la liste
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.error || 'Erreur lors de la création'}`);
    }
  };

  return (
    <div>
      <h2>Créer une salle de discussion</h2>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Nom de la salle"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          required
        />
        <button type="submit">Créer</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateChatRoomForm;
