import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rating {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	ratingScale: number;

	@Column()
	comment: string;

	@Column({ default: new Date() })
	date: Date;

	@Column()
	authorId: number;

	@Column()
	authorName: string;

	@Column()
	productId: number;

	@Column()
	purchaseDate: Date;
}
