import { Status } from "@entities/plant.entity";

export interface IPlant {
  id: number;
  name: string;
  description?: string;
  location?: string;
  plantingDate: Date;
  status: Status;
  createdAt: Date;
  updatedAt?: Date;
}
