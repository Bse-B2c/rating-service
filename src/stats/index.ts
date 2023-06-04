import { StatsController } from '@src/stats/stats.controller';
import { StatsService } from '@src/stats/stats.service';
import { ratingService, repository } from '@src/rating';

export const statsService = new StatsService(ratingService, repository);
export const statsController = new StatsController(statsService);
