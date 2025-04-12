import React from 'react';
import CreateChatRoomForm from './components/CreateChatRoomForm';
import ChatRoomList from './components/ChatRoomList';

function App() {
  const handleRoomCreated = () => {
    window.location.reload();
  };

  const handleJoinRoom = (room) => {
    alert(`Tu as rejoint la salle : ${room}`);
    // Tu peux naviguer vers une autre page ou afficher une interface de chat ici
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Application de Chat 💬</h1>
      <CreateChatRoomForm onRoomCreated={handleRoomCreated} />
      <ChatRoomList onJoinRoom={handleJoinRoom} />
    </div>
  );
}

export default App;
