import sql from 'mssql';
import dbConfig from './dbConfig.ts'; // Ensure the path is correct; you may need to adjust it

export async function connectAndQuery(queryString) {
  try {
    var poolConnection = await sql.connect(dbConfig);

    var resultSet = await poolConnection.request().query(queryString);

    poolConnection.close();

    return resultSet.recordset;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}
