import { IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { formatQueryToArray } from '@common/utils/query.utils';

export class ProductIdsDto {
	@IsOptional()
	@Transform(({ value }) => {
		if (value) return formatQueryToArray(value).map((e: string) => +e);

		return undefined;
	})
	productIds?: Array<number>;
}
