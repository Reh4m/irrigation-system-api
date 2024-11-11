import { NextFunction, Request, Response } from "express";
import { Container } from "typedi";

import { IMoistureLogs } from "../interfaces/moisture_logs.interface";
import { MoistureLogsService } from "../services/moisture_logs.service";

export class MoistureLogsController {
  public moistureLogs = Container.get(MoistureLogsService);

  public createLog = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const logData: IMoistureLogs = req.body;

      const newLog: IMoistureLogs = await this.moistureLogs.createLog(logData);

      res.status(201).json({
        data: newLog,
        message: "Moisture Log created succesfully",
      });
    } catch (error) {
      next(error);
    }
  };

  public getLogs = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const logs: IMoistureLogs[] = await this.moistureLogs.findAllLogs();

      res.status(200).json({ data: logs });
    } catch (error) {
      next(error);
    }
  };

  public getLogById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const logId = Number(req.params.id);

      const log: IMoistureLogs = await this.moistureLogs.findLogById(logId);

      res.status(200).json({ data: log });
    } catch (error) {
      next(error);
    }
  };

  public updateLog = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const logId = Number(req.params.id);
      const logData: IMoistureLogs = req.body;

      const updatedLog: IMoistureLogs | null =
        await this.moistureLogs.updateLog(logId, logData);

      res.status(200).json({
        data: updatedLog,
        message: "Moisture Log updated succesfully",
      });
    } catch (error) {
      next(error);
    }
  };

  public deleteLog = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const logId = Number(req.params.id);

      const deletedLog: IMoistureLogs = await this.moistureLogs.deleteLog(
        logId
      );

      res.status(200).json({
        data: deletedLog,
        message: "Moisture Log deleted succesfully",
      });
    } catch (error) {
      next(error);
    }
  };
}
