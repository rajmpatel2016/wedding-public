import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Role } from './enums/role.enum';
import { Exclude } from 'class-transformer';

@Entity()
export class Authentication {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name?: string;

	@Column({ unique: true })
	email: string;

	@Column()
	@Exclude()
	password: string;

	@Column({ default: Role.User })
	role: Role;

	@Column({
		nullable: true,
	})
	@Exclude()
	public currentHashedRefreshToken?: string;
}
