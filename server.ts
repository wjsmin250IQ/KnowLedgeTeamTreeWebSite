import express from 'express';
import connectToDatabase from './db'; // Vérifie que le fichier db.ts existe
import routes from './routes'; // Import du fichier routes.ts

const app = express();

// Connexion à la base de données
connectToDatabase();

// Middleware pour gérer les requêtes JSON
app.use(express.json());

// Utilisation des routes
app.use('/', routes);

// Démarrage du serveur
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🌍 Serveur sur http://localhost:${port}`));
