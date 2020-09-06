const express = require('express')

module.exports = {
  // chainWebpack: config => {
  //   config.plugin('copy').tap(([options]) => {
  //     options[0].ignore.push('api/**/*')
  //     return [options]
  //   })
  // },
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
