import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Connection string for Supabase PostgreSQL
const connectionString = process.env.DATABASE_URL;

// Create postgres client
export const client = postgres(connectionString, {
  max: 20,
  idle_timeout: 20,
  connect_timeout: 60,
  ssl: process.env.NODE_ENV === 'production' ? 'require' : false,
});

// Create Drizzle instance
export const db = drizzle(client, { schema });