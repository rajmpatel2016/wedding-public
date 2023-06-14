import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class GroupGuest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  guestId?: number;

  @Column({
    nullable: true,
  })
  groupId?: number;

  @Column({
    nullable: true,
  })
  weddingId?: number;
}
