import * as dotenv from 'dotenv';
import * as process from 'process';
import { DataSourceOptions } from 'typeorm';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/../common/entity/*.entity{.ts,.js}'],
  synchronize: true,
  logging: process.env['NODE_ENV'] !== 'production',
};
