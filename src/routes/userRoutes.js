// src/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Routes pour les utilisateurs, nécessitant l'authentification
router.get('/:id', authMiddleware.verifyToken, userController.getUser);
router.put('/:id', authMiddleware.verifyToken, userController.updateUser);

module.exports = router;
