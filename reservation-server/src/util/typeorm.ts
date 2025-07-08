import * as dotenv from 'dotenv';
import * as process from 'process';
import { DataSourceOptions } from 'typeorm';

dotenv.config();

console.log(
  process.env.MYSQLHOST,
  parseInt(process.env.MYSQLPORT),
  process.env.MYSQLUSER,
  process.env.MYSQLPASSWORD,
  process.env.MYSQLDATABASE,
);
console.log(process.env);
export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.MYSQLHOST,
  port: parseInt(process.env.MYSQLPORT),
  username: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  entities: [__dirname + '/../common/entity/*.entity{.ts,.js}'],
  synchronize: true,
  logging: process.env['NODE_ENV'] !== 'production',
};
