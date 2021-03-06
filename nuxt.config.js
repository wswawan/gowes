// import path from 'path'
// import fs from 'fs'
import colors from 'vuetify/es5/util/colors'

export default {
  target: 'static',
  ssr: false,
  server: {
    host: '0.0.0.0',
    port: 3000,
    // https: {
    //   key: fs.readFileSync(path.resolve('C:/Users/Ws', 'RootCA.key')),
    //   cert: fs.readFileSync(path.resolve('C:/Users/Ws', 'RootCA.pem')),
    // },
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Gowes',
    title: 'Gowes',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '@/plugins/qrcode.js', mode: 'client' }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://back.afalclo.id',
    headers: {
      common: {
        Accept: 'application/json, text/plain, */*',
        // 'X-Requested-With': 'XMLHttpRequest',
      },
      'Content-Type': 'application/json',
    },

    credentials: true,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  auth: {
    strategies: {
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: 'https://back.afalclo.id',
        endpoints: {
          login: {
            url: '/api/login',
          },
          logout: {
            url: '/api/logout',
          },
          user: {
            url: '/api/user',
          },
          register: {
            url: 'api/register',
            method: 'post',
          },
        },
        user: {
          property: false,
        },
        tokenRequired: false,
        tokenType: false,
      },
    },
    redirect: {
      login: '/',
      logout: '/',
      home: '/home',
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  generate: {
    fallback: false,
  },
}
