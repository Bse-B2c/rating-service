import { Router } from 'express';
import { validate } from '@common/utils/validate.utils';

const router = Router();

// controller
import { ratingController } from '@src/rating/';

// dtos
import { RatingDto } from '@src/rating/dtos/rating.dto';
import { ParamsDto } from '@src/common/dtos/params.dto';
import { SearchDto } from '@src/rating/dtos/search.dto';
import { UpdateRatingDto } from '@src/rating/dtos/updateRating.dto';

// validate
const validateBody = validate('body');
const validateParams = validate('params');
const validateQuery = validate('query');

router.post('/', validateBody(RatingDto), ratingController.create);
router.get('/:id', validateParams(ParamsDto), ratingController.findOne);
//router.get('/', validateQuery(SearchDto), ratingController.find);
router.delete('/:id', validateParams(ParamsDto), ratingController.delete);
router.patch(
	'/:id',
	validateParams(ParamsDto),
	validateBody(UpdateRatingDto),
	ratingController.update
);

export default router;
