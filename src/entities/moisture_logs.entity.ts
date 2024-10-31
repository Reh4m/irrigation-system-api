import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BaseEntity,
} from "typeorm";

import { Plant } from "@entities/plant.entity";

@Entity()
export class MoistureLogs extends BaseEntity {
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
