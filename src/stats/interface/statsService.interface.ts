export interface StatsService {
	getAverage(productId: number): Promise<number>;
	getPercentage(productId: number): Promise<{
		total: number;
		percentages: Array<{ scale: number; percentage: number }>;
	}>;
}
