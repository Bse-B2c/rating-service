import { Router } from 'express';
import rating from '@src/routes/api/rating';
import stats from '@src/routes/api/stats';

const router = Router();

router.use('/', rating);
router.use('/stats', stats);

export default router;
