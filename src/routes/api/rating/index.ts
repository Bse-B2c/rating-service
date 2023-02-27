import { Router } from 'express';
import { validate } from '@common/utils/validate.utils';

const router = Router();

// controller
import { ratingController } from '@src/rating/';

// dtos
import { RatingDto } from '@src/rating/dtos/rating.dtos';
import { ParamsDto } from '@src/common/dtos/params.dto';
import { SearchDto } from '@src/rating/dtos/search.dto';

// validate
const validateBody = validate('body');
const validateParams = validate('params');
const validateQuery = validate('query');

router.post('/', validateBody(RatingDto), ratingController.create);
router.get('/:id', validateParams(ParamsDto), ratingController.findOne);
//router.get('/', validateQuery(SearchDto), ratingController.find);
router.delete('/:id', validateParams(ParamsDto), ratingController.delete);
/*router.patch(
	'/:id',
	validateParams(ParamsDto),
	validateBody(RatingDto),
	ratingController.update
);*/

export default router;
