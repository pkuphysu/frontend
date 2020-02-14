const express = require('express')

module.exports = {
  // chainWebpack: config => {
  //   config.plugin('copy').tap(([options]) => {
  //     options[0].ignore.push('api/**/*')
  //     return [options]
  //   })
  // },
  devServer: {
    setup(app) {
      app.get(/api\/.*/, (req, res, next) => {
        req.url += '.json'
        next()
      })
      app.use('/api', express.static('api'))
      app.post('/api/booking/book', (req, res) => {
        let reqJ = JSON.parse(req.body)
        res.json({
          vercode: reqJ.vercode
        })
      })
    }
  }
}
