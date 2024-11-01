import { NextFunction, Request, Response } from "express";
import Container from "typedi";

import { Status } from "@entities/plant.entity";
import { IPlant } from "@interfaces/plant.interface";
import { PlantService } from "@services/plant.service";

export class PlantController {
  public plant = Container.get(PlantService);

  public async createPlant(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const plantData: IPlant = req.body;

      const newPlant: IPlant = await this.plant.createPlant(plantData);

      res
        .status(201)
        .json({ data: newPlant, message: "Plant created succesfully" });
    } catch (error) {
      next(error);
    }
  }

  public async getPlants(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const plants: IPlant[] = await this.plant.findAllPlants();

      res.status(200).json({ data: plants });
    } catch (error) {
      next(error);
    }
  }

  public async getPlantById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const plantId = Number(req.params.id);

      const plant: IPlant = await this.plant.findPlantById(plantId);

      res.status(200).json({ plant });
    } catch (error) {
      next(error);
    }
  }

  public async updatePlant(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const plantId = Number(req.params.id);
      const plantData: IPlant = req.body;

      const updatedPlant: IPlant | null = await this.plant.updatePlant(
        plantId,
        plantData
      );

      res
        .status(200)
        .json({ data: updatedPlant, message: "Plant updated succesfully" });
    } catch (error) {
      next(error);
    }
  }

  public async updatePlantStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const plantId = Number(req.params.id);
      const plantStatus: Status = req.body;

      const updatedPlant: IPlant | null = await this.plant.updatePlantStatus(
        plantId,
        plantStatus
      );

      res.status(200).json({
        data: updatedPlant,
        message: "Plant status updated succesfully",
      });
    } catch (error) {
      next(error);
    }
  }

  public async deletePlant(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const plantId = Number(req.params.id);

      const deletedPlant: IPlant = await this.plant.deletePlant(plantId);

      res.status(200).json({
        data: deletedPlant,
        message: "Plant deleted succesfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
