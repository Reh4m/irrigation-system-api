import { Repository } from "typeorm";
import { Service } from "typedi";

import { IrrigationLogs } from "@entities/irrigation_logs.entity";
import { IIrrigationLogs } from "@interfaces/irrigation_logs.interface";

@Service()
export class IrrigationLogsService extends Repository<IrrigationLogs> {
  public async findAllLogs(): Promise<IIrrigationLogs[]> {
    const logs: IIrrigationLogs[] = await IrrigationLogs.find();

    return logs;
  }

  public async findLogById(logId: number): Promise<IIrrigationLogs> {
    const log: IIrrigationLogs | null = await IrrigationLogs.findOne({
      where: { id: logId },
    });

    if (!log) throw new Error("Error 409: Log doesn't exist");

    return log;
  }

  public async createLog(logData: IIrrigationLogs): Promise<IIrrigationLogs> {
    const newLog: IIrrigationLogs = await IrrigationLogs.create({
      ...logData,
    }).save();

    return newLog;
  }

  public async updateLog(
    logId: number,
    logData: IIrrigationLogs
  ): Promise<IIrrigationLogs | null> {
    const findLog: IIrrigationLogs | null = await IrrigationLogs.findOne({
      where: { id: logId },
    });

    if (!findLog) throw new Error("Error 409: Log doesn't exist");

    await IrrigationLogs.update(logId, { ...logData });

    const updatedLog: IIrrigationLogs | null = await IrrigationLogs.findOne({
      where: { id: logId },
    });

    return updatedLog;
  }

  public async deleteLog(logId: number): Promise<IIrrigationLogs> {
    const findLog: IIrrigationLogs | null = await IrrigationLogs.findOne({
      where: { id: logId },
    });

    if (!findLog) throw new Error("Error 409: Log doesn't exist");

    await IrrigationLogs.delete({ id: logId });

    return findLog;
  }
}
