import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";

import { Plant } from "./plant.entity";

@Entity()
export class MoistureLogs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("decimal", { precision: 5, scale: 2 })
  moistureLevel: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  recordedAt: Date;

  @Column("text")
  notes: string;

  @ManyToOne(() => Plant)
  @JoinColumn()
  plant: Plant;
}
