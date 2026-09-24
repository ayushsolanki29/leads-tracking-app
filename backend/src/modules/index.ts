import { Router } from 'express';
import leadsRoutes from './leads/leads.routes';

const router = Router();

router.use('/leads', leadsRoutes);

export default router;
