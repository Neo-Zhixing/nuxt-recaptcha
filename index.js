const { resolve } = require('path')

const API_URL = 'https://www.google.com/recaptcha/api.js'

module.exports = function (options) {
  this.options.head.script.push({
    src: `${API_URL}?render=${options.key}`,
    defer: true,
    async: true,
  })
  this.addPlugin({
    fileName: 'captcha.js',
    options,
    src: resolve(__dirname, './plugin.js')
  })
  if (options.hideBadge) {
    this.options.css.push(resolve(__dirname, './hide.css'))
  }
}

module.exports.meta = require('./package.json')
