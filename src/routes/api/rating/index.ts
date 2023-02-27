import { Router } from "express";
import { validate } from '@common/utils/validate.utils';

const router = Router();

// controller
import { ratingController } from "@src/rating/rating.controller";

// dtos
import { RatingDto } from "@src/rating/dtos/rating.dtos"; 

// validate
const validateBody = validate('body');

router.post('/', validateBody(RatingDto), ratingController.create);

export default router;