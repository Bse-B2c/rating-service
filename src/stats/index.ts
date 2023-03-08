import { StatsController } from '@src/stats/stats.controller';
import { StatsService } from '@src/stats/stats.service';
import { ratingService } from '@src/rating';

export const statsService = new StatsService(ratingService);
export const statsController = new StatsController(statsService);
