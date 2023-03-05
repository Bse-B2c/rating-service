import { Router } from 'express';
import { validate } from '@common/utils/validate.utils';

const router = Router();

// controller
import { statsController } from '@src/stats/';

// dtos
import { ParamsDto } from '@src/common/dtos/params.dto';

// validate
const validateParams = validate('params');

router.get(
	'/:id/scale/average',
	validateParams(ParamsDto),
	statsController.average
);

export default router;
