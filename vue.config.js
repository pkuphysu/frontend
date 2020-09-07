const express = require('express')
const VueAutomaticImportPlugin = require(
  'vue-automatic-import-loader/lib/plugin'
)

const plugins = []

plugins.push(new VueAutomaticImportPlugin({
  match (originalTag, { kebabTag, camelTag }) {
    if (kebabTag.startsWith('b-')) {
      return [
        camelTag,
        `import {${camelTag}} from 'bootstrap-vue'`
      ]
    }
  }
}))
if (process.env.WEBPACK_STATS) {
  const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
  plugins.push(new BundleAnalyzerPlugin())
}

module.exports = {
  // chainWebpack: config => {
  //   config.plugin('copy').tap(([options]) => {
  //     options[0].ignore.push('api/**/*')
  //     return [options]
  //   })
  // },
  configureWebpack: { plugins },
  devServer: {
    setup (app) {
      app.get(/api\/.*/, (req, res, next) => {
        req.url = req.path + '.json'
        next()
      })
      app.use('/api', express.static('api'))
      app.post('/api/booking/book', (req, res) => {
        const reqJ = JSON.parse(req.body)
        res.json({
          vercode: reqJ.vercode
        })
      })
      app.post('/api/login', (req, res) => {
        res.json({
          message: 'Logged In',
          user: {
            token: '1234567890',
            timestamp: '1234567890',
            rawId: '1234567890',
            id: '1234567890'
          }
        })
      })
    }
  }
}
