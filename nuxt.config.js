export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Betamars',
    htmlAttrs: {
      lang: 'en',
      translate: "no"
    },
    meta: [
      { charset: 'utf-8' },
      { hid: 'description', name: 'description', content: '' },
      { name: "google", content: "notranslate" },
      { name: 'referrer', content: 'no-referrer' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'google-site-verification', content: 'FA_O0iWQesZZpLj0HfZdcaRq0SvllcSR85wuOy-GX4w' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },

    ],

  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/static/base.scss',
    '~/static/font.css',

  ],
  // 'element-ui/lib/theme-chalk/index.css',
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "@/plugins/lib-flexible.js", ssr: false },
    { src: "@/plugins/swiper.js", ssr: false },
    {
      src: '@/plugins/elementUI.js',
      ssr: false,
    }, {
      src: '@/plugins/moment.js',
      ssr: false,
    }, {
      src: '@/plugins/nprogress.js',
      ssr: false,
    },
    {
      src: '@/plugins/loading.js',
      ssr: false,
    }, {
      src: '@/plugins/countTo.js',
      ssr: false,
    },


  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [

  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', "@nuxtjs/proxy", 'nuxt-precompress'],
  nuxtPrecompress: {
    enabled: true, // Enable in production
    report: false, // set true to turn one console messages during module init
    test: /\.(js|css|html|txt|xml|svg)$/, // files to compress on build
    // Serving options
    middleware: {
      // You can disable middleware if you serve static files using nginx...
      enabled: true,
      // Enable if you have .gz or .br files in /static/ folder
      enabledStatic: true,
      // Priority of content-encodings, first matched with request Accept-Encoding will me served
      encodingsPriority: ['br', 'gzip'],
    },

    // build time compression settings
    gzip: {
      // should compress to gzip?
      enabled: true,
      // compression config
      // https://www.npmjs.com/package/compression-webpack-plugin
      filename: '[path].gz[query]', // middleware will look for this filename
      threshold: 10240,
      minRatio: 0.8,
      compressionOptions: { level: 9 },
    },
    brotli: {
      // should compress to brotli?
      enabled: true,
      // compression config
      // https://www.npmjs.com/package/compression-webpack-plugin
      filename: '[path].br[query]', // middleware will look for this filename
      compressionOptions: { level: 11 },
      threshold: 10240,
      minRatio: 0.8,
    },
  },
  proxy: {
    '/request/': {
      target: 'http://16.163.157.192:8888/',

      pathRewrite: {
        '^/request/': ''
      }
    }
  },
  router: {
    middleware: ['device'],
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'web-index',
        path: '/',
        redirect: '/web/home',
        component: resolve(__dirname, 'pages/web/index.vue')
      }
      )
    }
  },


  loadingIndicator: false,
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {

    babel: {
      plugins: [
        [
          'component',
          {
            'libraryName': 'element-ui',
            'styleLibraryName': 'theme-chalk'
          }
        ]
      ]
    },
    postcss: {
      plugins: {
        'postcss-px2rem-exclude': {
          remUnit: 192,
          exclude: /node_modules|@walletconnect/i
        }

      }
    },

    extend(config, { isDev, isClient }) {
      if (isClient && !isDev) {
        config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      }
    },

  }
}
