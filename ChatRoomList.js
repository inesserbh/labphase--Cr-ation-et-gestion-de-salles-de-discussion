import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ChatRoomList({ onJoinRoom }) {
  const [rooms, setRooms] = useState([]);

  const fetchRooms = async () => {
    const res = await axios.get('http://localhost:5000/api/chat-rooms');
    setRooms(res.data.rooms);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div>
      <h2>Salles disponibles</h2>
      <ul>
        {rooms.map((room, index) => (
          <li key={index}>
            {room} <button onClick={() => onJoinRoom(room)}>Rejoindre</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatRoomList;
