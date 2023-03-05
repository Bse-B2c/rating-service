import { Request, Response, NextFunction } from 'express';
import { StatsService } from '@stats/statsService';
import { HttpStatusCode } from '@bse-b2c/common';

export class StatsController {
	constructor(private service: StatsService) {}
	average = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const productId = parseInt(req.params.productId, 10);
			const averageRating = await this.service.average(productId);
			return res.status(HttpStatusCode.OK).send({
				statusCode: HttpStatusCode.OK,
				error: null,
				data: { averageRating },
			});
		} catch (e) {
			next(e);
		}
	};
}
