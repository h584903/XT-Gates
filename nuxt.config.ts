export default defineNuxtConfig({
  runtimeConfig: {
    dbServer: process.env.NUXT_DB_SERVER,
    dbUser: process.env.NUXT_DB_USER,
    dbPass: process.env.NUXT_DB_PASS,
    dbName: process.env.NUXT_DB_NAME,
    dbPort: process.env.NUXT_DB_PORT,
    dbEncrypt: process.env.NUXT_DB_ENCRYPT,
    tokenSecret: process.env.NUXT_TOKEN_SECRET,
    tokenExpiration: process.env.NUXT_TOKEN_EXPIRATION,
  },
  modules: [
    '@pinia/nuxt',
    '@nuxt/test-utils/module'
  ],
  devtools: { enabled: true },
})
