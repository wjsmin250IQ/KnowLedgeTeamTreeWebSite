// src/controllers/authController.js

const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Assurez-vous d'avoir un modèle User

// Exemple de fonction d'inscription
exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Validation simple
        if (!username || !password) {
            return res.status(400).json({ message: 'Tous les champs sont requis' });
        }

        // Créez un nouvel utilisateur
        const newUser = new User({ username, password });
        await newUser.save();

        res.status(201).json({ message: 'Utilisateur créé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur du serveur', error });
    }
};

// Exemple de fonction de connexion
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Vérifiez l'utilisateur
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Identifiants invalides' });
        }

        // Créez un token JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Connexion réussie', token });
    } catch (error) {
        res.status(500).json({ message: 'Erreur du serveur', error });
    }
};
