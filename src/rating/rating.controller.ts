import { RatingDto } from '@src/rating/dtos/rating.dto';
import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '@bse-b2c/common';
import { RatingService } from '@rating/interfaces/ratingService.interface';
import { SearchDto } from '@rating/dtos/search.dto';

export class RatingController {
	constructor(private service: RatingService) {}

	create = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const {
				ratingScale,
				comment,
				authorId,
				authorName,
				productId,
				purchaseDate,
			} = req.body as RatingDto;

			const response = await this.service.create({
				ratingScale,
				comment,
				authorId,
				productId,
				purchaseDate,
				authorName,
			});

			return res.status(HttpStatusCode.CREATED).send({
				statusCode: HttpStatusCode.CREATED,
				error: null,
				data: response,
			});
		} catch (e) {
			next(e);
		}
	};

	findOne = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;

			const response = await this.service.findOne(+id);

			return res.status(HttpStatusCode.OK).send({
				statusCode: HttpStatusCode.OK,
				error: null,
				data: response,
			});
		} catch (e) {
			next(e);
		}
	};

	findMyRating = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { orderBy, sortOrder, limit, page, ...search } =
				req.query as unknown as SearchDto;
			const userId = req.user ? req.user.id : -1;

			const response = await this.service.find({
				...search,
				orderBy: orderBy ?? 'ratingScale',
				authorId: userId,
				sortOrder: sortOrder ?? 'DESC',
				limit: limit || 10,
				page: page || 0,
			});

			return res.status(HttpStatusCode.OK).send({
				statusCode: HttpStatusCode.OK,
				error: null,
				data: response,
			});
		} catch (e) {
			next(e);
		}
	};

	find = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { orderBy, sortOrder, limit, page, ...search } =
				req.query as unknown as SearchDto;

			const response = await this.service.find({
				...search,
				orderBy: orderBy ?? 'ratingScale',
				sortOrder: sortOrder ?? 'DESC',
				limit: limit || 10,
				page: page || 0,
			});

			return res.status(HttpStatusCode.OK).send({
				statusCode: HttpStatusCode.OK,
				error: null,
				data: response,
			});
		} catch (e) {
			next(e);
		}
	};

	delete = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;

			const response = await this.service.delete(+id);

			return res.status(HttpStatusCode.OK).send({
				statusCode: HttpStatusCode.OK,
				error: null,
				data: response,
			});
		} catch (e) {
			next(e);
		}
	};

	update = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const {
				body: { ratingScale, comment, authorName },
				params: { id },
			} = req;

			const response = await this.service.update(+id, {
				ratingScale,
				comment,
				authorName,
			});

			return res.status(HttpStatusCode.OK).send({
				statusCode: HttpStatusCode.OK,
				error: null,
				data: response,
			});
		} catch (e) {
			next(e);
		}
	};
}
