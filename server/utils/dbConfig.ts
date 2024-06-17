import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  server: process.env.DB_SERVER,
        authentication: {
            type: 'default',
            options: {
                userName: process.env.DB_USER,
                password: process.env.DB_PASS,
            }
        },
        options: {
            encrypt: process.env.DB_ENCRYPT === "true",
            database: process.env.DB_NAME,
            port: parseInt(process.env.DB_PORT as string, 10),
        }
};

export default dbConfig;

