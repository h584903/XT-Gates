const sql = require('mssql');

const config = {
    user: '',
    password: '',
    database: '',
    host: '',

}

async function connectToSQLServer() {
    try {
        await sql.connect(config)
    }
    catch (err) {
        console.error('error',err)

    }
}