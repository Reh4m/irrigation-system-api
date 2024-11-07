import { Repository } from "typeorm";
import { Service } from "typedi";

import { MoistureLogs } from "@entities/moisture_logs.entity";
import { IMoistureLogs } from "@interfaces/moisture_logs.interface";

@Service()
export class MoistureLogsService extends Repository<MoistureLogs> {
  public async findAllLogs(): Promise<IMoistureLogs[]> {
    const logs: MoistureLogs[] = await MoistureLogs.find();

    return logs;
  }

  public async findLogById(logId: number): Promise<IMoistureLogs> {
    const log: IMoistureLogs | null = await MoistureLogs.findOne({
      where: { id: logId },
    });

    if (!log) throw new Error("Error 409: Log doesn't exist");

    return log;
  }

  public async createLog(logData: IMoistureLogs): Promise<IMoistureLogs> {
    const newLog = await MoistureLogs.create({ ...logData }).save();

    return newLog;
  }

  public async updateLog(
    logId: number,
    logData: IMoistureLogs
  ): Promise<IMoistureLogs | null> {
    const findLog: IMoistureLogs | null = await MoistureLogs.findOne({
      where: { id: logId },
    });

    if (!findLog) throw new Error("Error 409: Log doesn't exist");

    await MoistureLogs.update(logId, { ...logData });

    const updatedLog: IMoistureLogs | null = await MoistureLogs.findOne({
      where: { id: logId },
    });

    return updatedLog;
  }

  public async deleteLog(logId: number): Promise<IMoistureLogs> {
    const findLog: IMoistureLogs | null = await MoistureLogs.findOne({
      where: { id: logId },
    });

    if (!findLog) throw new Error("Error 409: Log doesn't exist");

    await MoistureLogs.delete({ id: logId });

    return findLog;
  }
}
