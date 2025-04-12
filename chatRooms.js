const express = require('express');
const router = express.Router();

// Simuler les salles en mémoire (tu pourras plus tard utiliser MongoDB si tu veux)
let chatRooms = [];

// Créer une nouvelle salle
router.post('/create', (req, res) => {
  const { roomName } = req.body;
  if (!roomName) return res.status(400).json({ error: "Nom de salle requis" });

  if (chatRooms.includes(roomName)) {
    return res.status(400).json({ error: "Salle déjà existante" });
  }

  chatRooms.push(roomName);
  res.status(201).json({ message: "Salle créée", roomName });
});

// Obtenir la liste des salles
router.get('/', (req, res) => {
  res.status(200).json({ rooms: chatRooms });
});

module.exports = router;
