import { config } from "dotenv";
config({ path: ".env" });

// Server variables
export const { PORT } = process.env;

// Database variables
export const { MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST, MYSQL_PORT, MYSQL_DB } =
  process.env;
