import sql from 'mssql';
import dbConfig from './dbConfig.js'; // Ensure the path is correct; you may need to adjust it

export async function getConnection() {
  try {
    const pool = await sql.connect(dbConfig);
    return pool;
  } catch (err) {
    console.error('Database Connection Failed!', err);
    throw err;
  }
}
