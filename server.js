// 🚀 Importation des modules
const express = require("express");
const mongoose = require("mongoose");
const winston = require("winston");
const dotenv = require("dotenv");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const fs = require("fs").promises; // Utilisation de `fs.promises` pour les opérations async
const { errorHandler, notFoundHandler } = require("./middlewares/errorHandler");

// 🚀 Chargement des variables d'environnement
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// 📌 Initialisation de l'application Express
const app = express();
const PORT = process.env.PORT || 3001;
const DB_URI = process.env.DB_URI; // Utilisation de la variable d'environnement DB_URI
const LINKS_FILE = path.join(__dirname, "links.json");

// 📌 Configuration du logger avec Winston
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: "server.log" })
  ]
});

// 🚀 Connexion à MongoDB avec l'URI depuis les variables d'environnement
const connectDB = async () => {
  if (!DB_URI) {
    logger.error("❌ L'URL de la base de données (DB_URI) n'est pas définie !");
    return;
  }

  try {
    await mongoose.connect(DB_URI);
    logger.info("✅ Connexion réussie à MongoDB.");
  } catch (error) {
    logger.error("❌ Erreur de connexion MongoDB:", error);
    setTimeout(connectDB, 5000); // Reconnexion automatique après 5 secondes
  }
};

// 🚀 Connexion à MongoDB
connectDB();

// 🚀 Configuration des middlewares globaux
app.use(helmet()); // Sécurisation des en-têtes HTTP
app.use(cors({ origin: process.env.CORS_ALLOWED_ORIGINS || "*", methods: ["GET", "POST", "PUT", "DELETE"] }));
app.use(express.json()); // Parsing des requêtes JSON
app.use(express.static(path.join(__dirname, 'public'))); // Pour servir les fichiers statiques
app.use(morgan("combined", { stream: { write: (message) => logger.info(message.trim()) } })); // Logger HTTP

// 📌 Protection contre les attaques (Rate Limiting)
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite de 100 requêtes par IP par fenêtre de 15 minutes
  message: "🚫 Trop de requêtes, réessayez plus tard."
}));

// 📌 Routes API
app.get("/api/links", async (req, res, next) => {
  try {
    const data = await fs.readFile(LINKS_FILE, "utf8");
    res.json(JSON.parse(data));
  } catch (err) {
    logger.error("Erreur de lecture du fichier JSON:", err);
    next(err);
  }
});

app.post("/api/links", async (req, res, next) => {
  try {
    const newLink = req.body;
    const data = await fs.readFile(LINKS_FILE, "utf8");
    const links = JSON.parse(data);

    links.push(newLink);
    await fs.writeFile(LINKS_FILE, JSON.stringify(links, null, 2));

    res.status(201).json({ message: "✅ Lien ajouté avec succès !", links });
  } catch (err) {
    logger.error("Erreur lors de l'ajout du lien:", err);
    next(err);
  }
});

// 📌 Page d'accueil
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 📌 Gestion des erreurs et des routes inconnues
app.use(errorHandler);
app.use(notFoundHandler);

// 🚀 Démarrage du serveur
app.listen(PORT, () => logger.info(`✅ Serveur en ligne : http://localhost:${PORT}`));
