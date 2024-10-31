import { Repository } from "typeorm";
import { Service } from "typedi";

import { Plant, Status } from "@entities/plant.entity";
import { IPlant } from "@interfaces/plant.interface";

@Service()
export class PlantService extends Repository<Plant> {
  public async findAllPlants(): Promise<IPlant[]> {
    const plants: IPlant[] = await Plant.find();

    return plants;
  }

  public async findPlantById(plantId: number): Promise<IPlant> {
    const findPlant: IPlant | null = await Plant.findOne({
      where: { id: plantId },
    });

    if (!findPlant) throw new Error("Error 409: Plant doesn't exist");

    return findPlant;
  }

  public async createPlant(plantData: IPlant): Promise<IPlant> {
    const newPlant: IPlant = await Plant.create({ ...plantData }).save();

    return newPlant;
  }

  public async updatePlant(
    plantId: number,
    plantData: IPlant
  ): Promise<IPlant | null> {
    const findPlant: IPlant | null = await Plant.findOne({
      where: { id: plantId },
    });

    if (!findPlant) throw new Error("Error 409: Plant doesn't exist");

    await Plant.update(plantId, { ...plantData });

    const updatedPlant: IPlant | null = await Plant.findOne({
      where: { id: plantId },
    });

    return updatedPlant;
  }

  public async updatePlantStatus(
    plantId: number,
    status: Status
  ): Promise<IPlant | null> {
    const findPlant: IPlant | null = await Plant.findOne({
      where: { id: plantId },
    });

    if (!findPlant) throw new Error("Error 409: Plant doesn't exist");

    await Plant.update(plantId, { status });

    const updatedPlant: IPlant | null = await Plant.findOne({
      where: { id: plantId },
    });

    return updatedPlant;
  }

  public async deletePlant(plantId: number): Promise<IPlant> {
    const findPlant: IPlant | null = await Plant.findOne({
      where: { id: plantId },
    });

    if (!findPlant) throw new Error("Error 409: Plant doesn't exist");

    await Plant.delete({ id: plantId });

    return findPlant;
  }
}
