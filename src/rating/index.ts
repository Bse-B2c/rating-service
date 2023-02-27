import { dataSource } from "@src/database";
import { Rating } from "@rating/entity/rating.entity";
import { RatingController } from '@rating/rating.controller'
import { RatingService } from '@rating/rating.service'

const repository = dataSource.getRepository(Rating);
export const ratingService = new RatingService(repository);
export const ratingController = new RatingController(ratingService);