import { Router } from "express";
import { PlantController } from "@controllers/plant.controller";

export class PlantRoutes {
  public router: Router;
  private plant: PlantController;

  constructor() {
    this.router = Router();
    this.plant = new PlantController();
    this.routes();
  }

  private routes() {
    this.router.get("/", this.plant.getPlants);
    this.router.get("/:id(\\d+)", this.plant.getPlantById);
    this.router.post("/", this.plant.createPlant);
    this.router.put("/:id(\\d+)", this.plant.updatePlant);
    this.router.delete("/:id(\\d+)", this.plant.deletePlant);
  }
}
