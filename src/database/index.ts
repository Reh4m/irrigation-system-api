import {
  MYSQL_DB,
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_PORT,
} from "../config";
import { DataSource, DataSourceOptions } from "typeorm";

const dbConfig: DataSourceOptions = {
  type: "mysql",
  host: MYSQL_HOST,
  port: Number(MYSQL_PORT),
  username: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DB,
  logging: true,
  synchronize: true,
};

export const dbConnection = async () => {
  const dataSource = new DataSource(dbConfig);

  await dataSource.initialize();
};
