import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { Plant } from "./plant.entity";

@Entity()
export class IrrigationHistory {
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
