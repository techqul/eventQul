import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';

// Load environment variables
config();

export const dataSourceOptions: DataSourceOptions = {
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
  extra: {
    max: 20, // Maximum number of connections in the pool
    idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
    connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
  },
};

// Create dataSource instance
export const dataSource = new DataSource(dataSourceOptions);

// Export for TypeORM CLI
export default dataSourceOptions;

// CLI configuration for migrations
// Add to package.json scripts:
// "typeorm": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js -d src/config/database.config.ts"
// "migration:generate": "npm run typeorm -- migration:generate -n"
// "migration:run": "npm run typeorm -- migration:run"
// "migration:revert": "npm run typeorm -- migration:revert"
