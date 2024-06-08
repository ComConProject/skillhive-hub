import process from 'node:process'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  css: ['@/assets/css/main.css'],
  modules: [
    '@vueuse/nuxt',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxtjs/supabase',
    '@unlok-co/nuxt-stripe',
    '@nuxtjs/i18n',
    '@nuxt/image',
  ],
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  },
  supabase: {
    redirectOptions: {
      login: '/signin',
      callback: '/confirm',
      exclude: ['/signin', '/signup', '/confirm'],
    },
    redirect: true,
  },
  stripe: {
    // Server
    server: {
      key: process.env.STRIPE_PUBLISHABLE_KEY,
      options: {
        // your api options override for stripe server side
        apiVersion: '2022-11-15', // optional, default is '2022-11-15'
      },
    // CLIENT
    },
    client: {
      key: process.env.STRIPE_PUBLISHABLE_KEY,
      // your api options override for stripe client side
      options: {
      },
    },
  },
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en-US.json',
      },
      { code: 'lo', file: 'lo-LA.json' },
    ],
    defaultLocale: 'lo',
    lazy: true,
    langDir: 'locales/',
    strategy: 'prefix_except_default',
    vueI18n: './i18n.config.ts', // if you are using custom path, default
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root', // recommended
    },
  },
  experimental: {
    typedPages: true,
  },
})
