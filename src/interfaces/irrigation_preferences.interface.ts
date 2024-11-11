import { FrequencyUnit } from "../entities/irrigation_preferences.entity";
import { IPlant } from "../interfaces/plant.interface";

export interface IIrrigationPreferences {
  id: number;
  irrigationFrequency: number;
  frequencyUnit: FrequencyUnit;
  minimumSoilMoisture: number;
  maximumSoilMoisture: number;
  isActive: boolean;
  notes?: string;
  createdAt: Date;
  updatedAt?: Date;
  plant: IPlant;
}
