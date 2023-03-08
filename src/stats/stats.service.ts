import { StatsService as Service } from '@stats/interface/statsService.interface';
import { RatingService } from '@src/rating/rating.service';

export class StatsService implements Service {
	constructor(private ratingService: RatingService) {}

	getAverage = async (productId: number): Promise<number> => {
		const ratings = await this.ratingService.findByProduct(productId);
		const averageRating =
			ratings.reduce((a, b) => a + b.ratingScale, 0) / ratings.length || 0;
		return averageRating;
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
