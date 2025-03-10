import express from 'express';
import connectToDatabase from './db'; // Assure-toi que le chemin est correct

const app = express();

// Connexion à la base de données
connectToDatabase();

// Route de test
app.get('/', (req, res) => {
  res.send('Bienvenue sur le serveur !');
});

// Middleware pour gérer les requêtes JSON
app.use(express.json());

// Démarrage du serveur
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🌍 Serveur sur http://localhost:${port}`));
