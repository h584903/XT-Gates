import sql from 'mssql';
import dbConfig from './dbConfig.ts'; // Ensure the path is correct; you may need to adjust it

const pool = new sql.ConnectionPool(dbConfig);
const poolConnect = pool.connect();

pool.on('error', err => {
    console.error('SQL Database Connection Pool Error:', err);
});

export async function connectAndQuery(queryString, params = []) {
  await poolConnect; // ensures that the pool has been created

  try {
    const request = pool.request();
    
    // Add parameters to the request if any
    params.forEach(param => {
      request.input(param.name, param.type, param.value);
    });

    const resultSet = await request.query(queryString);
    return resultSet.recordset;
  } catch (err) {
    console.error('Failed to execute query:', err);
    throw err;
  }
}
