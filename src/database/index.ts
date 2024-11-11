import { DataSource, DataSourceOptions } from "typeorm";
import { join } from "path";

import {
  MYSQL_DB,
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_PORT,
} from "../config";

const dbConfig: DataSourceOptions = {
  type: "mysql",
  host: MYSQL_HOST,
  port: Number(MYSQL_PORT),
  username: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DB,
  logging: false,
  synchronize: true,
  entities: [join(__dirname, "../**/*.entity{.ts,.js}")],
  migrations: [join(__dirname, "../**/*.migration{.ts,.js}")],
  subscribers: [join(__dirname, "../**/*.subscriber{.ts,.js}")],
};

export const dbConnection = async () => {
  const dataSource = new DataSource(dbConfig);

  await dataSource.initialize();
};
