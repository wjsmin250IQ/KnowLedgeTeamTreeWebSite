// src/middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');

// Middleware pour vérifier le token JWT
exports.verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(403).json({ message: 'Accès interdit, token manquant' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Ajoute les infos de l'utilisateur à la requête
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token invalide' });
    }
};
