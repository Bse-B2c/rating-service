import { Router } from 'express';
import { validate } from '@common/utils/validate.utils';

const router = Router();

// controller
import { statsController } from '@src/stats/';

// dtos
import { ParamsDto } from '@src/common/dtos/params.dto';
import { ProductIdsDto } from '@stats/dtos/ProductIds.dto';

// validate
const validateParams = validate('params');
const validateQuery = validate('query');

router.get(
	'/average',
	validateQuery(ProductIdsDto),
	statsController.getProductsAverage
);
router.get(
	'/:id/scale/average',
	validateParams(ParamsDto),
	statsController.getAverage
);
router.get(
	'/:id/scale/percentage',
	validateParams(ParamsDto),
	statsController.getPercentage
);

export default router;
