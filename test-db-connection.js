import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;

console.log('Testing database connection...');
console.log('Connection string format:', connectionString ? 'Present' : 'Missing');

async function testConnection() {
  try {
    const sql = postgres(connectionString, {
      max: 1,
      connect_timeout: 10,
      ssl: 'require'
    });
    
    console.log('Attempting to connect...');
    const result = await sql`SELECT version()`;
    console.log('Connection successful!');
    console.log('Database version:', result[0].version);
    
    await sql.end();
    console.log('Connection closed.');
  } catch (error) {
    console.error('Connection failed:', error.message);
    console.error('Error code:', error.code);
  }
}

testConnection();