import { NextFunction, Request, Response } from "express";
import { Container } from "typedi";

import { IIrrigationPreferences } from "@interfaces/irrigation_preferences.interface";
import { IrrigationPreferencesService } from "@services/irrigation_preferences.service";

export class IrrigationPreferencesController {
  public irrigationPreferences = Container.get(IrrigationPreferencesService);

  public async createPreference(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const preferenceData: IIrrigationPreferences = req.body;

      const newPreference: IIrrigationPreferences =
        await this.irrigationPreferences.createPreference(preferenceData);

      res.status(201).json({
        data: newPreference,
        message: "Irrigation Preference created successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  public async getPreferences(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const preferences: IIrrigationPreferences[] =
        await this.irrigationPreferences.findAllPreferences();

      res.status(200).json({ data: preferences });
    } catch (error) {
      next(error);
    }
  }

  public async getPreferenceById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const preferenceId = Number(req.params.id);

      const preference: IIrrigationPreferences =
        await this.irrigationPreferences.findPreferenceById(preferenceId);

      res.status(200).json({ data: preference });
    } catch (error) {
      next(error);
    }
  }

  public async updatePreference(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const preferenceId = Number(req.params.id);
      const preferenceData: IIrrigationPreferences = req.body;

      const updatedPreference: IIrrigationPreferences | null =
        await this.irrigationPreferences.updatePreference(
          preferenceId,
          preferenceData
        );

      res.status(200).json({
        data: updatedPreference,
        message: "Irrigation Preference updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  public async deletePreference(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const preferenceId = Number(req.params.id);

      const deletedPreference: IIrrigationPreferences =
        await this.irrigationPreferences.deletePreference(preferenceId);

      res.status(200).json({
        data: deletedPreference,
        message: "Irrigation Preference deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
