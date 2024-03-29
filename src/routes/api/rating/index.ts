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
import {
	ensureAuthenticated,
	verifyRoles,
} from '@middleware/ensureAuthenticated';
import { Role } from '@common/enums/role.enum';

// validate
const validateBody = validate('body');
const validateParams = validate('params');
const validateQuery = validate('query');

router.get(
	'/me',
	ensureAuthenticated,
	verifyRoles([Role.CONSUMER, Role.ADMIN]),
	validateQuery(SearchDto),
	ratingController.findMyRating
);
router.post(
	'/',
	ensureAuthenticated,
	verifyRoles([Role.CONSUMER, Role.ADMIN]),
	validateBody(RatingDto),
	ratingController.create
);
router.get(
	'/:id',
	ensureAuthenticated,
	verifyRoles([Role.CONSUMER, Role.ADMIN]),
	validateParams(ParamsDto),
	ratingController.findOne
);
router.get('/', validateQuery(SearchDto), ratingController.find);
router.delete(
	'/:id',
	ensureAuthenticated,
	verifyRoles([Role.CONSUMER, Role.ADMIN]),
	validateParams(ParamsDto),
	ratingController.delete
);
router.patch(
	'/:id',
	ensureAuthenticated,
	verifyRoles([Role.CONSUMER, Role.ADMIN]),
	validateParams(ParamsDto),
	validateBody(UpdateRatingDto),
	ratingController.update
);

export default router;
