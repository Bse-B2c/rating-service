import { StatsService as Service } from '@stats/interface/statsService.interface';
import { RatingService } from '@src/rating/rating.service';
import { Repository } from 'typeorm';
import { Rating } from '@rating/entity/rating.entity';
import { ProductsAverage } from '@stats/interface/ProductsAverage';

export class StatsService implements Service {
	constructor(
		private ratingService: RatingService,
		private ratingRepository: Repository<Rating>
	) {}

	getProductsAverage = async (
		productIds: Array<number>
	): Promise<Array<ProductsAverage>> => {
		return Array.isArray(productIds) && productIds.length > 0
			? await this.ratingRepository
					.createQueryBuilder('rating')
					.select([
						'rating.productId, COUNT("productId")::float as total, AVG(rating.ratingScale)::float as average',
					])
					.where(`rating.productId In (${productIds})`)
					.groupBy('rating.productId')
					.getRawMany()
			: [];
	};

	getAverage = async (productId: number): Promise<number> => {
		const ratings = await this.ratingService.findByProduct(productId);
		return ratings.reduce((a, b) => a + b.ratingScale, 0) / ratings.length || 0;
	};

	getPercentage = async (
		productId: number
	): Promise<{
		total: number;
		percentages: Array<{ scale: number; percentage: number }>;
	}> => {
		const ratings = await this.ratingService.findByProduct(productId);
		const total = ratings.length;
		const ratingScaleCounter = ratings.reduce(
			(acumulator: { [key: string]: number } = {}, currentValue) => {
				const key = currentValue.ratingScale;
				if (!acumulator[key]) acumulator[key] = 0;
				acumulator[key] += 1;
				return acumulator;
			},
			{}
		);

		return {
			total,
			percentages: Object.keys(ratingScaleCounter).map((key: string) => ({
				scale: Number(key),
				percentage: (ratingScaleCounter[key] / total) * 100,
			})),
		};
	};
}
