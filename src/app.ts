import "reflect-metadata";

import express, { Express } from "express";
import cors from "cors";

import { dbConnection } from "@database";
import { PORT } from "@config";

export class Server {
  private app: Express;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.database();
  }

  private routes(): void {}

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

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  }
}
