// next.config.js

module.exports = {
  images: {
    unoptimized: true,
  },
    webpackDevMiddleware: config => {
      config.watchOptions = {
        poll: 10000,
        aggregateTimeout: 100,
      }
      return config
    },
  }