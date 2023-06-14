import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class Message {
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
  guestId?: number;
}
