import {
	IsISO8601,
	IsNotEmpty,
	IsString,
	IsNumber,
	IsOptional,
} from 'class-validator';

export class RatingDto {
	@IsNotEmpty()
	@IsNumber()
	ratingScale: number;

	@IsOptional()
	@IsString()
	comment: string;

	@IsNotEmpty()
	@IsNumber()
	authorId: number;

	@IsOptional()
	@IsString()
	authorName: string;

	@IsNotEmpty()
	@IsNumber()
	productId: number;

	@IsNotEmpty()
	@IsISO8601()
	purchaseDate: Date;
}
