import {
	IsISO8601,
	IsNotEmpty,
	IsString,
	IsNumber,
	IsOptional,
} from 'class-validator';

export class UpdateRatingDto {
	@IsNotEmpty()
	@IsNumber()
	ratingScale: number;

	@IsOptional()
	@IsString()
	comment: string;
}
