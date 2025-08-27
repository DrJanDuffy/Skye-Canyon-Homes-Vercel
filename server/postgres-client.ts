import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is required');
}

const sql = postgres(connectionString, {
  // Connection pool configuration
  max: 20,
  idle_timeout: 20,
  connect_timeout: 60,
  // SSL configuration for production
  ssl: process.env.NODE_ENV === 'production' ? 'require' : false,
  // Transform column names from snake_case to camelCase
  transform: {
    column: {
      from: postgres.fromCamel,
      to: postgres.toCamel,
    },
  },
});

export default sql;
