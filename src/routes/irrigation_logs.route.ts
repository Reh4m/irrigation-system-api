import { Router } from "express";
import { IrrigationLogsController } from "../controllers/irrigation_logs.controller";

export class IrrigationLogsRoutes {
  public router: Router;
  private irrigationLogs: IrrigationLogsController;

  constructor() {
    this.router = Router();
    this.irrigationLogs = new IrrigationLogsController();
    this.routes();
  }

  private routes() {
    this.router.get("/", this.irrigationLogs.getLogs);
    this.router.get("/:id(\\d+)", this.irrigationLogs.getLogById);
    this.router.post("/", this.irrigationLogs.createLog);
    this.router.put("/:id(\\d+)", this.irrigationLogs.updateLog);
    this.router.delete("/:id(\\d+)", this.irrigationLogs.deleteLog);
  }
}
