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
            encrypt: runtimeConfig.dbEncrypt == "true",
            database: runtimeConfig.dbName,
            port: parseInt(runtimeConfig.dbPort as string, 10),
        }
};

export default dbConfig;

