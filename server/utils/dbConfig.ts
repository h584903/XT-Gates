
const dbConfig = {
  server: process.env.DB_SERVER,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 1433,
  authentication: {
    type: 'default'
  },
  options: {
    encrypt: true
  }
};

export default dbConfig;

