import { StatsService as Service } from '@stats/interface/statsService.interface';
import { Repository } from 'typeorm';
import { Rating } from '@rating/entity/rating.entity';

import { HttpException, HttpStatusCode } from '@bse-b2c/common';

export class StatsService implements Service {
	constructor(private repository: Repository<Rating>) {}

	average = async (productId: number): Promise<number> => {
		const ratings = await this.repository.find({
			where: { productId },
		});
		if (!productId)
			throw new HttpException({
				statusCode: HttpStatusCode.NOT_FOUND,
				message: 'Product not found',
			});
		const averageRating =
			ratings.reduce((a, b) => a + b.ratingScale, 0) / ratings.length || 0;
		return averageRating;
	};
}
