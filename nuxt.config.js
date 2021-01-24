export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  mode: 'spa',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'NEOSOUL-Reviews',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/css/style.css',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/firebase.js'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/vuetify'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios','nuxt-fontawesome','@nuxtjs/dotenv','nuxt-webfontloader'
  ],
  webfontloader: {
    google: {
      families: ['Roboto:100,300,400,500']
    }
  },
  axios: {
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },
  fontawesome: {
    component: 'fa'
  },
}