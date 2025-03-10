const winston = require("winston");

// 📌 Configuration du logger Winston pour les erreurs
const logger = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "errors.log" })
  ]
});

// 📌 Middleware de gestion des erreurs globales
module.exports.errorHandler = (err, req, res, next) => {
  const errorId = new Date().getTime(); // ID unique pour tracer l’erreur
  const statusCode = err.statusCode || 500;

  const errorResponse = {
    success: false,
    errorId,
    statusCode,
    message: err.message || "🚨 Une erreur interne est survenue.",
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
    timestamp: new Date().toISOString(),
    path: req.originalUrl
  };

  logger.error(`🔥 [ID ${errorId}] Erreur ${statusCode} sur ${req.originalUrl}`, { error: err });

  res.status(statusCode).json(errorResponse);
};

// 📌 Middleware pour gérer les routes non trouvées
module.exports.notFoundHandler = (req, res, next) => {
  const error = {
    success: false,
    statusCode: 404,
    message: "❌ Route non trouvée.",
    timestamp: new Date().toISOString(),
    path: req.originalUrl
  };

  logger.warn(`⚠️ Route inconnue : ${req.originalUrl}`);
  res.status(404).json(error);
};
