import { Repository } from "typeorm";
import { Service } from "typedi";

import { IrrigationPreferences } from "../entities/irrigation_preferences.entity";
import { IIrrigationPreferences } from "../interfaces/irrigation_preferences.interface";

@Service()
export class IrrigationPreferencesService extends Repository<IrrigationPreferences> {
  public async findAllPreferences(): Promise<IIrrigationPreferences[]> {
    const preferences: IrrigationPreferences[] =
      await IrrigationPreferences.find();

    return preferences;
  }

  public async findPreferenceById(
    preferenceId: number
  ): Promise<IIrrigationPreferences> {
    const preference: IIrrigationPreferences | null =
      await IrrigationPreferences.findOne({
        where: { id: preferenceId },
      });

    if (!preference) throw new Error("Error 409: Preference doesn't exist");

    return preference;
  }

  public async createPreference(
    preferenceData: IIrrigationPreferences
  ): Promise<IIrrigationPreferences> {
    const newPreference = await IrrigationPreferences.create({
      ...preferenceData,
    }).save();

    return newPreference;
  }

  public async updatePreference(
    preferenceId: number,
    preferenceData: IIrrigationPreferences
  ): Promise<IIrrigationPreferences | null> {
    const findPreference: IIrrigationPreferences | null =
      await IrrigationPreferences.findOne({
        where: { id: preferenceId },
      });

    if (!findPreference) throw new Error("Error 409: Preference doesn't exist");

    await IrrigationPreferences.update(preferenceId, { ...preferenceData });

    const updatedPreference: IIrrigationPreferences | null =
      await IrrigationPreferences.findOne({
        where: { id: preferenceId },
      });

    return updatedPreference;
  }

  public async deletePreference(
    preferenceId: number
  ): Promise<IIrrigationPreferences> {
    const findPreference: IIrrigationPreferences | null =
      await IrrigationPreferences.findOne({
        where: { id: preferenceId },
      });

    if (!findPreference) throw new Error("Error 409: Preference doesn't exist");

    await IrrigationPreferences.delete({ id: preferenceId });

    return findPreference;
  }
}
