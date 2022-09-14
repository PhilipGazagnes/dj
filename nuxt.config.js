export default {
  target: 'static',
  head: {
    meta: [
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, user-scalable=no',
      },
      {
        name: 'robots',
        content: 'noIndex',
      },
    ],
    link: [
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700&display=swap',
      },
    ],
  },
  modules: process.env.ENABLE_PWA ? ['@nuxtjs/pwa'] : undefined,
  workbox: process.env.ENABLE_PWA
    ? {
        globPatterns: ['**/*.{js,css}', '**/img/*'],
        offlinePage: '/404.html',
        offline: true,
      }
    : undefined,
  build: {
    postcss: {
      plugins: {
        'postcss-nested': {},
      },
      preset: {
        autoprefixer: {
          grid: true,
        },
      },
    },
  },
};
