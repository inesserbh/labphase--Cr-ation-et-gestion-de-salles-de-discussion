const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

// Importation des routes
const authRoutes = require('./routes/auth');
const chatRoomRoutes = require('./routes/chatRooms');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes); // Routes d'authentification
app.use('/api/chat-rooms', chatRoomRoutes); // Routes des salles de discussion

// Connexion à MongoDB
const MONGO_URI = "mongodb://localhost:27017/chat-app"; // ou ton lien MongoDB Atlas
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connexion MongoDB réussie"))
.catch(err => console.error("❌ Erreur MongoDB :", err));

// Route test
app.get("/", (req, res) => {
  res.send("API Chat fonctionne ✅");
});

// Gestion des sockets (salles de discussion en temps réel)
const usersInRooms = {}; // { roomName: [socketId, ...] }

io.on('connection', (socket) => {
  console.log(`🔌 Nouvelle connexion : ${socket.id}`);

  socket.on('joinRoom', (room) => {
    socket.join(room);

    if (!usersInRooms[room]) usersInRooms[room] = [];
    if (!usersInRooms[room].includes(socket.id)) {
      usersInRooms[room].push(socket.id);
    }

    io.to(room).emit('roomUsers', usersInRooms[room]);
    console.log(`✅ ${socket.id} a rejoint la salle ${room}`);
  });

  socket.on('leaveRoom', (room) => {
    socket.leave(room);

    if (usersInRooms[room]) {
      usersInRooms[room] = usersInRooms[room].filter(id => id !== socket.id);
      io.to(room).emit('roomUsers', usersInRooms[room]);
    }

    console.log(`🚪 ${socket.id} a quitté la salle ${room}`);
  });

  socket.on('sendMessage', ({ room, message }) => {
    io.to(room).emit('receiveMessage', `👤 ${socket.id.slice(0, 4)}: ${message}`);
  });

  socket.on('disconnect', () => {
    console.log(`❌ Déconnexion : ${socket.id}`);

    for (const room in usersInRooms) {
      usersInRooms[room] = usersInRooms[room].filter(id => id !== socket.id);
      io.to(room).emit('roomUsers', usersInRooms[room]);
    }
  });
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});
