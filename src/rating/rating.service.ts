import { RatingService as Service } from '@rating/interfaces/ratingService.interface';
import { RatingDto } from '@src/rating/dtos/rating.dto';
import { Rating } from '@rating/entity/rating.entity';
import { Repository } from 'typeorm';
import { HttpException, HttpStatusCode } from '@bse-b2c/common';
import { UpdateRatingDto } from './dtos/updateRating.dto';

export class RatingService implements Service {
	constructor(private repository: Repository<Rating>) {}

	create = async ({
		ratingScale,
		comment,
		date,
		authorId,
		productId,
		purchaseDate,
	}: RatingDto): Promise<Rating> => {
		const rating = await this.repository.findOne({ where: { authorId, productId } });
		if (rating)
			throw new HttpException({
				statusCode: HttpStatusCode.CONFLICT,
				message: 'The rating already exists.',
			});

		const newRating = this.repository.create({
			ratingScale,
			comment,
			date,
			authorId,
			productId,
			purchaseDate,
		});

		return this.repository.save(newRating);
	};

	findOne = async (id: number): Promise<Rating> => {
		const rating = await this.repository.findOne({
			where: { id },
		});

		if (!rating)
			throw new HttpException({
				statusCode: HttpStatusCode.NOT_FOUND,
				message: `Rating ${id} not found`,
			});

		return rating;
	};

	delete = async (id: number) => {
		const rating = await this.findOne(id);

		await this.repository.delete(id);

		return rating;
	};

	update = async (
		id: number,
		updateRating: UpdateRatingDto
	): Promise<Rating> => {
		const rating = await this.findOne(id);

		Object.assign(rating, updateRating);
		return this.repository.save(rating);
}
