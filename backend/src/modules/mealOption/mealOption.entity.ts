import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class MealOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  name?: string;

  @Column({
    nullable: true,
  })
  number?: number;

  @Column({
    nullable: true,
  })
  counter?: number;

  @Column({
    nullable: true,
  })
  weddingId?: number;
}
