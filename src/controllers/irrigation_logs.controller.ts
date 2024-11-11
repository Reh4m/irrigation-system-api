import { NextFunction, Request, Response } from "express";
import Container from "typedi";

import { IIrrigationLogs } from "../interfaces/irrigation_logs.interface";
import { IrrigationLogsService } from "../services/irrigation_logs.service";

export class IrrigationLogsController {
  public irrigationLogs = Container.get(IrrigationLogsService);

  public createLog = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const logData: IIrrigationLogs = req.body;

      const newLog: IIrrigationLogs = await this.irrigationLogs.createLog(
        logData
      );

      res
        .status(201)
        .json({ data: newLog, message: "Irrigation log created successfully" });
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
      const logs: IIrrigationLogs[] = await this.irrigationLogs.findAllLogs();

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

      const log: IIrrigationLogs = await this.irrigationLogs.findLogById(logId);

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
      const logData: IIrrigationLogs = req.body;

      const updatedLog: IIrrigationLogs | null =
        await this.irrigationLogs.updateLog(logId, logData);

      res.status(200).json({
        data: updatedLog,
        message: "Irrigation log updated successfully",
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

      const deletedLog: IIrrigationLogs = await this.irrigationLogs.deleteLog(
        logId
      );

      res.status(200).json({
        data: deletedLog,
        message: "Irrigation log deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };
}
