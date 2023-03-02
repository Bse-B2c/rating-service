import { RatingService as Service } from '@rating/interfaces/ratingService.interface';
import { RatingDto } from '@src/rating/dtos/rating.dto';
import { Rating } from '@rating/entity/rating.entity';
import {
	Repository,
	FindOptionsWhere,
	FindOptionsOrderValue,
	In,
	Like,
	Equal,
	MoreThanOrEqual,
} from 'typeorm';
import { HttpException, HttpStatusCode } from '@bse-b2c/common';
import { UpdateRatingDto } from './dtos/updateRating.dto';
import { SearchDto } from '@rating/dtos/search.dto';

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
		const rating = await this.repository.findOne({
			where: { authorId, productId },
		});
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

	update = async (
		id: number,
		updateRating: UpdateRatingDto
	): Promise<Rating> => {
		const rating = await this.findOne(id);

		Object.assign(rating, {
			date: new Date(),
			comment: updateRating.comment !== undefined ? updateRating.comment : '',
			ratingScale: updateRating.ratingScale,
		});

		return this.repository.save(rating);
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

	find = async (search: SearchDto): Promise<Array<Rating>> => {
		const {
			ids,
			ratingScale,
			comment,
			date,
			authorId,
			productId,
			purchaseDate,
			limit = 10,
			page = 0,
			orderBy = 'ratingScale',
			sortOrder = 'DESC',
		} = search;
		let where: FindOptionsWhere<Rating> = {};

		if (ids) where = { ...where, id: In(ids) };

		if (ratingScale) where = { ...where, ratingScale: Equal(ratingScale) };

		if (comment) where = { ...where, comment: Like(`%${comment}%`) };

		if (date) where = { ...where, date: MoreThanOrEqual(new Date(date)) };

		if (authorId) where = { ...where, authorId: Equal(authorId) };

		if (productId) where = { ...where, productId: Equal(productId) };

		if (purchaseDate)
			where = {
				...where,
				purchaseDate: MoreThanOrEqual(new Date(purchaseDate)),
			};

		return this.repository.find({
			where,
			order: {
				[orderBy]: sortOrder as FindOptionsOrderValue,
				ratingScale: sortOrder as FindOptionsOrderValue,
			},
			take: limit,
			skip: page * limit,
		});
	};

	delete = async (id: number) => {
		const rating = await this.findOne(id);

		await this.repository.delete(id);

		return rating;
	};
}
