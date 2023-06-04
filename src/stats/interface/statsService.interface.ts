import { ProductsAverage } from '@stats/interface/ProductsAverage';

export interface StatsService {
	getProductsAverage(
		productIds: Array<number>
	): Promise<Array<ProductsAverage>>;
	getAverage(productId: number): Promise<number>;
	getPercentage(productId: number): Promise<{
		total: number;
		percentages: Array<{ scale: number; percentage: number }>;
	}>;
}
