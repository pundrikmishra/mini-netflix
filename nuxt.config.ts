export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  css: [
    '~/assets/css/main.css'
  ],
  runtimeConfig: {
    public: {
      OMDB_API_KEY: process.env.NUXT_PUBLIC_OMDB_API_KEY || 'DEFAULT_API_KEY_IF_NOT_SET' // Provide a fallback
    }
  }
})