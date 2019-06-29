const { resolve } = require('path')

const API_URL = 'https://www.google.com/recaptcha/api.js'

module.exports = function (options) {
  this.options.head.script.push({
    src: API_URL + '?onload=nuxtRecaptchaCallback&render=explicit',
    defer: true,
    async: true,
  })
  this.options.head.script.push({
    innerHTML: 'window.recaptchaReadyPromise=new Promise(function(resolve){window.nuxtRecaptchaCallback=resolve});'
  })
  this.addPlugin({
    fileName: 'plugin.js',
    options,
    src: resolve(__dirname, './plugin.js'),
  })
}

module.exports.meta = require('./package.json')
