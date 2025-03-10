const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

// Fonction pour se connecter à la base de données MongoDB
export const connectToDatabase = async () => {
  try {
    // Modification de l'accès à process.env pour corriger l'indexation
    const dbUri = process.env['MONGODB_URI'] || 'mongodb://localhost:27017/KnowLedgeTeamTreeWebsite';

    if (!dbUri) {
      throw new Error('L\'URI de la base de données MongoDB n\'est pas définie');
    }

    console.log('Connexion à MongoDB avec l\'URI :', dbUri);

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 5000,
    };

    await mongoose.connect(dbUri, options);
    console.log('Connexion réussie à MongoDB');
    
    mongoose.connection.on('disconnected', () => {
      console.error('Perte de connexion à MongoDB, tentative de reconnexion...');
      reconnectToDatabase(dbUri, options);
    });

    mongoose.connection.on('reconnected', () => {
      console.log('Connexion rétablie à MongoDB');
    });

  } catch (err) {
    console.error('Erreur de connexion à MongoDB:', err);
    process.exit(1);
  }
};

const reconnectToDatabase = async (dbUri: string, options: any) => {
  try {
    console.log('Tentative de reconnexion à MongoDB...');
    await mongoose.connect(dbUri, options);
    console.log('Reconnexion réussie à MongoDB');
  } catch (err) {
    console.error('Échec de la reconnexion à MongoDB:', err);
    setTimeout(() => reconnectToDatabase(dbUri, options), 5000);
  }
};

// Exposer la fonction de connexion à la base de données pour pouvoir l'utiliser ailleurs
module.exports = connectToDatabase;
