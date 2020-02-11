module.exports = {
  chainWebpack: config => {
    config.plugin('copy').tap(([options]) => {
      options[0].ignore.push('api/**/*')
      return [options]
    })
  }
}
