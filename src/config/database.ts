import 'reflect-metadata';

import * as dotenv from 'dotenv';
import * as path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config({ path: path.join(__dirname, '../../.env') });
const { env } = process;

export const dbOptions: DataSourceOptions = {
  type: 'postgres',
  host: env.POSTGRES_HOST,
  port: parseInt(env.POSTGRES_POST, 10) || 54320,
  database: env.POSTGRES_DB,
  username: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
  migrationsTableName: 'migrations',
};

const dataSource = new DataSource(dbOptions);
export default dataSource;
