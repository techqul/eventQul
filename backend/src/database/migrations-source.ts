import { DataSource } from 'typeorm';
import { config } from 'dotenv';

// Load environment variables
config();

// Create DataSource instance for migrations
export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'eventqul',
  entities: [process.env.DB_ENTITIES || 'dist/**/*.entity{.ts,.js}'],
  migrations: [process.env.DB_MIGRATIONS || 'dist/database/migrations/*{.ts,.js}'],
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  logging: process.env.DB_LOGGING === 'true',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});
