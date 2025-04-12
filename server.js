const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
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
app.use('/api/chat-rooms', chatRoomRoutes);

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

// Gestion des sockets
io.on('connection', (socket) => {
  console.log(`🔌 Nouvelle connexion : ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`❌ Déconnexion : ${socket.id}`);
  });
});

// Importation des routes d'authentification
const authRoutes = require('./routes/auth');  

// Lier les routes d'authentification à '/api/auth'
app.use('/api/auth', authRoutes);

// Démarrage serveur
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});
