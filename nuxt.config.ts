// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
  },
  modules: [
    '@pinia/nuxt',
    '@nuxt/test-utils/module'
  ],
  devtools: { enabled: true },
})
