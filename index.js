const { resolve } = require('path')

const API_URL = 'https://www.google.com/recaptcha/api.js'

module.exports = function (options) {
  this.options.head.script.push({
    src: API_URL + '?onload=nuxtRecaptchaCallback&render=explicit',
    defer: true,
    async: true,
    id: 'grecaptcha-js'
  })
  this.options.head.script.push({
    innerHTML: "window.recaptchaReadyPromise=new Promise(function(re, rj){window.nuxtRecaptchaCallback=function(){re(window.grecaptcha)};document.getElementById('grecaptcha-js').onerror=rj});"
  })
  this.options.head.__dangerouslyDisableSanitizers = ['script']
  this.addPlugin({
    fileName: 'plugin.js',
    options,
    src: resolve(__dirname, './plugin.js'),
  })
}

module.exports.meta = require('./package.json')
