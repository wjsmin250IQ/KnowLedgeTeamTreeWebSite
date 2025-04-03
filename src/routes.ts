import { Request, Response, Router } from 'express';

// Définir le routeur
const router = Router();

// Définir la route d'accueil
router.get('/', (_req: Request, res: Response) => {
  res.send('Bienvenue sur le serveur !');
});

// Exporter le routeur
export default router;
