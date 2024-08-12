// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/eslint'],
  eslint: { config: { stylistic: { semi: true } } },
  compatibilityDate: '2024-08-12',
});
