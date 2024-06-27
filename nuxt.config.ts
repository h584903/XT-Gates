// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    dbServer: '',
    dbUser: '',
    dbPass: '',
    dbName: '',
    dbPort: '',
    dbEncrypt: '',
    tokenSecret: '',
    tokenExpiration: '',
  },
  modules: [
    '@pinia/nuxt',
    '@nuxt/test-utils/module'
  ],
  devtools: { enabled: false },
})
