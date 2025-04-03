// src/controllers/userController.js

const User = require('../models/userModel');

// Fonction pour obtenir les détails d'un utilisateur
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Erreur du serveur', error });
    }
};

// Fonction pour mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Erreur du serveur', error });
    }
};
