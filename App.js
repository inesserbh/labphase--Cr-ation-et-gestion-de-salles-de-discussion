import React, { useState } from 'react';
import CreateChatRoomForm from './components/CreateChatRoomForm';
import ChatRoomList from './components/ChatRoomList';
import ChatRoom from './components/ChatRoom';

function App() {
  const [currentRoom, setCurrentRoom] = useState(null);

  const handleRoomCreated = () => {
    window.location.reload();
  };

  const handleJoinRoom = (room) => {
    setCurrentRoom(room);
  };

  const handleLeaveRoom = () => {
    setCurrentRoom(null);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Application de Chat 💬</h1>
      {currentRoom ? (
        <ChatRoom room={currentRoom} onLeave={handleLeaveRoom} />
      ) : (
        <>
          <CreateChatRoomForm onRoomCreated={handleRoomCreated} />
          <ChatRoomList onJoinRoom={handleJoinRoom} />
        </>
      )}
    </div>
  );
}

export default App;
