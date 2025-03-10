const express = require('express');
const router = express.Router();

// Exemple de route API
router.get('/status', (req, res) => {
  res.json({ status: 'Le serveur fonctionne parfaitement !' });
});

module.exports = router;
