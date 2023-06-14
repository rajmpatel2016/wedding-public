import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class MessageGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  name?: string;

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
  message?: string;

  @Column({
    nullable: true,
  })
  groupId?: number;

  @Column({
    nullable: true,
  })
  weddingId?: number;

  @Column({
    nullable: true,
  })
  scheduled?: boolean;

  @Column({
    nullable: true,
  })
  sent?: boolean;
}
