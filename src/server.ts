import express from 'express';
import { connectToDatabase } from './db';
import routes from './routes';
import dotenv from 'dotenv';

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

const app = express();

// Connexion à la base de données
connectToDatabase();

// Middleware JSON pour Express
app.use(express.json());

// Utiliser les routes
app.use('/', routes);

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
app.listen(port, () => {
  console.log(`🌍 Serveur sur http://localhost:${port}`);
});
