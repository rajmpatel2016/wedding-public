import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class Wedding {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  date?: string;

  @Column({
    nullable: true,
  })
  time?: string;

  @Column({
    nullable: true,
  })
  address?: string;

  @Column({
    nullable: true,
  })
  mealResponses?: boolean;

  @Column({
    nullable: true,
  })
  userId?: number;

  @Column({
    nullable: true,
  })
  rsvps?: boolean;

  @Column({
    nullable: true,
  })
  trial?: boolean;

  @Column({
    nullable: true,
  })
  status?: string;
}
