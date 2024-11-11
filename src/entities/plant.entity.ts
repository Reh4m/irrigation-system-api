import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from "typeorm";

import { IrrigationPreferences } from "./irrigation_preferences.entity";
import { IrrigationLogs } from "./irrigation_logs.entity";
import { MoistureLogs } from "./moisture_logs.entity";

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
  plantingDate: Date;

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

  @OneToMany(() => IrrigationLogs, (irrigationLogs) => irrigationLogs.plant)
  irrigationLogs: IrrigationLogs;

  @OneToOne(
    () => IrrigationPreferences,
    (irrigationPreferences) => irrigationPreferences.plant
  )
  irrigationPreferences: IrrigationPreferences;

  @OneToMany(() => MoistureLogs, (moistureLogs) => moistureLogs.plant)
  moistureLogs: MoistureLogs;
}
