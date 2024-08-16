// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/eslint'],
  eslint: { config: { stylistic: { semi: true } } },
  compatibilityDate: '2024-08-12',
  app: {
    head: {
      title: 'co2',
      link: [
        { rel: 'manifest', href: 'manifest.json' },
        { rel: 'apple-touch-icon', href: 'apple-touch-icon.png', sizes: '180x180' },
      ],
    },
  },
  nitro: {
    prerender: { autoSubfolderIndex: false },
  },
});
