import { Router } from "express";
import { IrrigationPreferencesController } from "@controllers/irrigation_preferences.controller";

export class IrrigationPreferencesRoutes {
  public router: Router;
  private irrigationPreferences: IrrigationPreferencesController;

  constructor() {
    this.router = Router();
    this.irrigationPreferences = new IrrigationPreferencesController();
    this.routes();
  }

  private routes() {
    this.router.get("/", this.irrigationPreferences.getPreferences);
    this.router.get("/:id(\\d+)", this.irrigationPreferences.getPreferenceById);
    this.router.post("/", this.irrigationPreferences.createPreference);
    this.router.put("/:id(\\d+)", this.irrigationPreferences.updatePreference);
    this.router.delete(
      "/:id(\\d+)",
      this.irrigationPreferences.deletePreference
    );
  }
}
