import { Router } from 'express';
import rating from '@src/routes/api/rating';

const router = Router();

router.use('/rating', rating);

export default router;
