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

      const createPlantData: IPlant = await this.plant.createPlant(plantData);

      res
        .status(201)
        .json({ data: createPlantData, message: "Plant created succesfully" });
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
      const findAllPlantsData: IPlant[] = await this.plant.findAllPlants();

      res.status(200).json({ data: findAllPlantsData });
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

      const findOnePlantData: IPlant = await this.plant.findPlantById(plantId);

      res.status(200).json({ findOnePlantData });
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

      const updatedPlantData: IPlant | null = await this.plant.updatePlant(
        plantId,
        plantData
      );

      res
        .status(200)
        .json({ data: updatedPlantData, message: "Plant updated succesfully" });
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

      const updatedPlantData: IPlant | null =
        await this.plant.updatePlantStatus(plantId, plantStatus);

      res.status(200).json({
        data: updatedPlantData,
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

      const deletedPlantData: IPlant = await this.plant.deletePlant(plantId);

      res.status(200).json({
        data: deletedPlantData,
        message: "Plant deleted succesfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
