import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rating {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	ratingScale: number;

	@Column()
	comment: string;

	@Column()
	date: Date;

	@Column()
	authorId: number;

	@Column()
	productId: number;

	@Column()
	purchaseDate: Date;
}
