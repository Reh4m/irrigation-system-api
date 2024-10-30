import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export type Status = "active" | "inactive" | "dormant" | "harvested";

@Entity()
export class Plant extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  especies: string;

  @Column("text")
  description: string;

  @Column()
  location: string;

  @Column()
  planting_date: Date;

  @Column({
    type: "enum",
    enum: ["active", "inactive", "dormant", "harvested"],
    default: "active",
  })
  status: Status;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
