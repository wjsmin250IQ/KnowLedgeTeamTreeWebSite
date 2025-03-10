import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

// Fonction pour se connecter à la base de données MongoDB
const connectToDatabase = async () => {
  try {
    // Utilisation de la variable d'environnement MONGODB_URI ou URI par défaut
    const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/KnowLedgeTeamTreeWebsite';

    // Vérifier si l'URI de la base de données est défini
    if (!dbUri) {
      throw new Error('L\'URI de la base de données MongoDB n\'est pas définie');
    }

    // Affichage de l'URI utilisée pour la connexion (pour la transparence)
    console.log('Connexion à MongoDB avec l\'URI :', dbUri);

    // Options de connexion avec Mongoose pour améliorer la stabilité de la connexion
    const options = {
      useNewUrlParser: true, // Option pour la compatibilité avec le parsing de l'URL
      useUnifiedTopology: true, // Pour utiliser le nouveau moteur de gestion des topologies
      autoIndex: false, // Ne pas auto-créer d'index au démarrage (améliore les performances)
      connectTimeoutMS: 10000, // Délai d'attente pour la connexion en millisecondes
      socketTimeoutMS: 45000, // Délai d'attente pour la gestion des sockets
      serverSelectionTimeoutMS: 5000, // Délai pour choisir un serveur (empêche de bloquer longtemps)
    };

    // Connexion à MongoDB via Mongoose
    await mongoose.connect(dbUri, options);

    console.log('Connexion réussie à MongoDB');
    
    // Écoute des événements de déconnexion et réconnexion
    mongoose.connection.on('disconnected', () => {
      console.error('Perte de connexion à MongoDB, tentative de reconnexion...');
      reconnectToDatabase(dbUri, options); // Reconnexion automatique en cas de déconnexion
    });

    mongoose.connection.on('reconnected', () => {
      console.log('Connexion rétablie à MongoDB');
    });

  } catch (err) {
    console.error('Erreur de connexion à MongoDB:', err);
    process.exit(1); // Ferme le processus en cas d'échec de connexion
  }
};

// Fonction pour tenter une reconnexion automatique en cas de perte de connexion
const reconnectToDatabase = async (dbUri: string, options: any) => {
  try {
    console.log('Tentative de reconnexion à MongoDB...');
    await mongoose.connect(dbUri, options);
    console.log('Reconnexion réussie à MongoDB');
  } catch (err) {
    console.error('Échec de la reconnexion à MongoDB:', err);
    setTimeout(() => reconnectToDatabase(dbUri, options), 5000); // Essayer toutes les 5 secondes
  }
};

// Exposer la fonction de connexion à la base de données pour pouvoir l'utiliser ailleurs
export default connectToDatabase;
