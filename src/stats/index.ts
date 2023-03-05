import { dataSource } from '@src/database';
import { Rating } from '@src/rating/entity/rating.entity';
import { StatsController } from '@stats/statsController';
import { StatsService } from '@stats/statsService';

const repository = dataSource.getRepository(Rating);
export const statsService = new StatsService(repository);
export const statsController = new StatsController(statsService);
