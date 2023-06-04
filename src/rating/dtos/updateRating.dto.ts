import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateRatingDto {
	@IsNotEmpty()
	@IsNumber()
	ratingScale: number;

	@IsOptional()
	@IsString()
	comment: string;

	@IsOptional()
	@IsString()
	authorName: string;
}
