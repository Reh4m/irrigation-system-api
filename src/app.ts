import "reflect-metadata";

import express, { Express } from "express";
import cors from "cors";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

import { dbConnection } from "@database";
import { PORT } from "@config";

import { IrrigationLogsRoutes } from "@routes/irrigation_logs.route";
import { PlantRoutes } from "@routes/plant.route";
import { IrrigationPreferencesRoutes } from "@routes/irrigation_preferences.route";
import { MoistureLogsRoutes } from "@routes/moisture_logs.route";

export class Server {
  private app: Express;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.database();
    this.swagger();
  }

  private routes(): void {
    this.app.use("/api/irrigation-logs", new IrrigationLogsRoutes().router);
    this.app.use(
      "/api/irrigation-preferences",
      new IrrigationPreferencesRoutes().router
    );
    this.app.use("/api/moisture-logs", new MoistureLogsRoutes().router);
    this.app.use("/api/plants", new PlantRoutes().router);
  }

  private config(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private database(): void {
    const run = async () => {
      await dbConnection();
    };

    run()
      .then(() => {
        console.log("Database connection has been initialized. ✅");
      })
      .catch(({ sqlMessage }) => {
        console.error(`SQL Error: ${sqlMessage}`);
      });
  }

  public swagger(): void {
    const options = {
      failOnErrors: true,
      definition: {
        openapi: "3.0.0",
        info: {
          title: "Irrigation System API",
          version: "1.0.0",
        },
      },
      apis: ["swagger.yaml"],
    };

    const openapiSpecification = swaggerJsdoc(options);
    this.app.use(
      "/api-docs",
      swaggerUI.serve,
      swaggerUI.setup(openapiSpecification)
    );
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  }
}
