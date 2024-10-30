import { IPlant } from "@interfaces/plant.interface";

export interface IMoistureLogs {
  id: number;
  moistureLevel: number;
  recordedAt: Date;
  notes?: string;
  plant: IPlant;
}
