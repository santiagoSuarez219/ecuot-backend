import { Router } from 'express';
import { InterventionController } from '../controllers/InterventionController';

const router = Router();

router.post('/', InterventionController.createIntervention);
router.get('/', InterventionController.getAllInterventions);

export default router;