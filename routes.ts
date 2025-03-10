import { Router, Request, Response } from 'express';

const router = Router();

// Route de test
router.get('/', (_req: Request, res: Response) => {
  res.send('Bienvenue sur le serveur !');
});

export default router;
