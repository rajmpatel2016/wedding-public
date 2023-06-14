import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  groupName?: string;

  @Column({
    nullable: true,
  })
  weddingId?: number;
}
