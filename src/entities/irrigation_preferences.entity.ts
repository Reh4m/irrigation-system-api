import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { Plant } from "./plant.entity";

export type FrequencyUnit = "hours" | "days";

@Entity()
export class IrrigationPreferences {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  irrigationFrequency: number;

  @Column({ type: "enum", enum: ["hours", "days"], default: "hours" })
  frequencyUnit: FrequencyUnit;

  @Column("time")
  irrigationTime: string;

  @Column("decimal", { precision: 5, scale: 2 })
  minimumSoilMoisture: number;

  @Column("decimal", { precision: 5, scale: 2 })
  maximumSoilMoisture: number;

  @Column({ default: false })
  isActive: boolean;

  @Column("text")
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Plant)
  @JoinColumn()
  plant: Plant;
}
