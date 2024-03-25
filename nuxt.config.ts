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
      exclude: [],
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
})
