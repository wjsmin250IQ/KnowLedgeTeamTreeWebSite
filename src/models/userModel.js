// src/models/userModel.js
const mongoose = require('mongoose');

// Définition du schéma utilisateur
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Création et exportation du modèle
const User = mongoose.model('User', userSchema);
module.exports = User;
