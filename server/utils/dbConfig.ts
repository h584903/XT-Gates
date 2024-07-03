const runtimeConfig = useRuntimeConfig()

const dbConfig = {
  server: runtimeConfig.dbServer,
        authentication: {
            type: 'default',
            options: {
                userName: runtimeConfig.dbUser,
                password: runtimeConfig.dbPass,
            }
        },
        options: {
            encrypt: process.env.DB_ENCRYPT === "true",
            database: runtimeConfig.dbName,
            port: parseInt(runtimeConfig.dbPort as string, 10),
        }
};

export default dbConfig;

