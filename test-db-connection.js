import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;

async function testConnection() {
  try {
    const sql = postgres(connectionString, {
      max: 1,
      connect_timeout: 10,
      ssl: 'require',
    });
    const _result = await sql`SELECT version()`;

    await sql.end();
  } catch (_error) {}
}

testConnection();
