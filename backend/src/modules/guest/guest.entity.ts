import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class Guest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  name?: string;

  @Column({
    nullable: true,
  })
  phoneNumber?: string;

  @Column({
    nullable: true,
  })
  rsvp?: boolean;

  @Column({
    nullable: true,
  })
  guests?: number;

  @Column({
    nullable: true,
  })
  weddingId?: number;

  @Column({
    nullable: true,
  })
  mealOptionId?: string;

  @Column({ nullable: true })
  address?: string;
}
