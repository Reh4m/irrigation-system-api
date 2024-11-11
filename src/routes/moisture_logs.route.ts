import { Router } from "express";
import { MoistureLogsController } from "../controllers/moisture_logs.controller";

export class MoistureLogsRoutes {
  public router: Router;
  private moistureLogs: MoistureLogsController;

  constructor() {
    this.router = Router();
    this.moistureLogs = new MoistureLogsController();
    this.routes();
  }

  private routes() {
    this.router.get("/", this.moistureLogs.getLogs);
    this.router.get("/:id(\\d+)", this.moistureLogs.getLogById);
    this.router.post("/", this.moistureLogs.createLog);
    this.router.put("/:id(\\d+)", this.moistureLogs.updateLog);
    this.router.delete("/:id(\\d+)", this.moistureLogs.deleteLog);
  }
}
