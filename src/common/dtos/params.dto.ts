import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class ParamsDto {
	@Transform(({ value }) => +value)
	@IsNumber({}, { message: 'id must be a number' })
	id: number;
}
