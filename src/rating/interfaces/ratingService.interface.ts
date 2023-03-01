import { RatingDto } from '@src/rating/dtos/rating.dto';
import { Rating } from '@rating/entity/rating.entity';
import { UpdateRatingDto } from '@src/rating/dtos/updateRating.dto';
export interface RatingService {
	create(rating: RatingDto): Promise<Rating>;
	findOne(id: number): Promise<Rating>;
	delete(id: number): Promise<Rating>;
	update(id: number, rating: UpdateRatingDto): Promise<Rating>;
}
