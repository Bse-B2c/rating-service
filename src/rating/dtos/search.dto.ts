import { Transform } from 'class-transformer';
import { formatQueryToArray } from '@src/common/utils/query.utils';
import {
	IsISO8601,
	IsString,
	IsNumber,
	IsOptional,
	IsIn,
} from 'class-validator';

export class SearchDto {
	@IsOptional()
	@Transform(({ value }) => {
		if (value) return formatQueryToArray(value).map((e: string) => +e);

		return value;
	})
	ids?: Array<number>;

	@IsOptional()
	@IsNumber()
	@Transform(({ value }) => +value)
	ratingScale?: number;

	@IsOptional()
	@IsString()
	comment?: string;

	@IsOptional()
	@IsISO8601()
	date?: string;

	@IsOptional()
	@IsNumber()
	@Transform(({ value }) => +value)
	authorId?: number;

	@IsOptional()
	@IsNumber()
	@Transform(({ value }) => +value)
	productId?: number;

	@IsOptional()
	@IsISO8601()
	purchaseDate?: string;

	@IsIn(['DESC', 'ASC'])
	@IsOptional()
	sortOrder: number;

	@IsString()
	@IsIn(['ratingScale', 'date'])
	@IsOptional()
	orderBy?: string;

	@IsNumber({}, { message: 'page must be a valid number' })
	@IsOptional()
	@Transform(({ value }) => +value)
	page?: number;

	@IsNumber({}, { message: 'limit must be a valid number' })
	@IsOptional()
	@Transform(({ value }) => +value)
	limit?: number;
}
