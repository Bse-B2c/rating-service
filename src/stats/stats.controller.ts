import { Request, Response, NextFunction } from 'express';
import { StatsService } from '@src/stats/stats.service';
import { HttpStatusCode } from '@bse-b2c/common';
import { ProductIdsDto } from '@stats/dtos/ProductIds.dto';

export class StatsController {
	constructor(private service: StatsService) {}
	getAverage = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;
			const averageRating = await this.service.getAverage(+id);
			return res.status(HttpStatusCode.OK).send({
				statusCode: HttpStatusCode.OK,
				error: null,
				data: averageRating,
			});
		} catch (e) {
			next(e);
		}
	};

	getProductsAverage = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { productIds } = req.query as ProductIdsDto;

			const response = await this.service.getProductsAverage(productIds || []);

			return res.status(HttpStatusCode.OK).send({
				statusCode: HttpStatusCode.OK,
				error: null,
				data: response,
			});
		} catch (e) {
			next(e);
		}
	};

	getPercentage = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;
			const percentageRating = await this.service.getPercentage(+id);
			return res.status(HttpStatusCode.OK).send({
				statusCode: HttpStatusCode.OK,
				error: null,
				data: percentageRating,
			});
		} catch (e) {
			next(e);
		}
	};
}
