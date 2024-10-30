import { IPlant } from "@interfaces/plant.interface";

export interface IIrrigationLogs {
  id: number;
  irrigationTime: string;
  duration?: number;
  notes?: string;
  plant: IPlant;
}
