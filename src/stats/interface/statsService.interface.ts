export interface StatsService {
	average(productId: number): Promise<number>;
}
