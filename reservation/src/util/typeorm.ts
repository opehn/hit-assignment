import * as dotenv from 'dotenv';
import * as process from 'process';
import { DataSourceOptions } from 'typeorm';

dotenv.config();
console.log('DB Config:', {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD ? '***' : 'undefined',
  database: process.env.DB_DATABASE,
});

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  logging: process.env['NODE_ENV'] !== 'production',
};
