import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";

import { Plant } from "@entities/plant.entity";

@Entity()
export class IrrigationHistory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("timestamp")
  irrigationTime: string;

  @Column()
  duration: number;

  @Column("text")
  notes: string;

  @ManyToOne(() => Plant)
  @JoinColumn()
  plant: Plant;
}
