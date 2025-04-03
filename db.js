const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Charger les variables d'environnement depuis le fichier .env
dotenv.config(); 

// Récupère l'URL de connexion MongoDB depuis .env ou utilise une base locale par défaut
const dbURI = process.env.DB_URI || 'mongodb://localhost:27017/knowledgeteam'; // Valeur par défaut en local si aucune variable d'environnement n'est définie

// Options pour la connexion
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, options);
    console.log('🚀 Connexion à MongoDB réussie !');
  } catch (err) {
    console.error('❌ Échec de la connexion à MongoDB:', err);
    // Tenter une reconnexion après 5 secondes en cas d'échec
    setTimeout(connectDB, 5000);
  }
};

// Connexion initiale
connectDB();

module.exports = mongoose;  // Exporte mongoose pour l'utiliser ailleurs dans ton projet
