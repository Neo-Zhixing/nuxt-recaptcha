import Vue from 'vue'

const options = <%= serialize(options) %>

const EventBus = new Vue()

const component =  {
  render(h) {
    return h(
      'div',
      { class: { 'recaptcha-container': true } },
      [ this.$slots.default ]
    )
  },
  props: {
    theme: {
      type: String,
      default: 'light',
      validator: value => value === 'light' || value === 'dark',
    },
    badge: {
      type: String,
      default: 'inline',
      validator: value => ['bottomright', 'bottomleft', 'inline'].includes(value),
    },
    invisible: {
      type: Boolean,
      default: false,
    }
  },
  mounted() {
    const renderOptions = {
      sitekey: options.key,
      theme: this.theme,
      badge: this.badge,
    }
    if (this.invisible) {
      renderOptions.size = 'invisible'
    }
    window.recaptchaReadyPromise
      .then(() => window.grecaptcha.render(
        this.$el,
        {
          ...renderOptions,
          callback: (res) => {
            this.$emit('update:token', res)
            EventBus.$emit('token', res)
          },
          'expired-callback' () {
            this.$emit('update:token', null)
          },
          'error-callback' () {
            this.$emit('update:token', null)
          },
      }))
  },
}


export default function (_, inject) {
  if (process.client) {
    function execute() {
      return window.recaptchaReadyPromise
      .then((grecaptcha) => new Promise((resolve) => {
        grecaptcha.execute()
        function handler (token) {
          resolve(token)
          EventBus.$off(handler)
        }
        EventBus.$on('token', handler)
      }))
    }
    execute.reset = function() {
      window.recaptchaReadyPromise.then((grecaptcha) => grecaptcha.reset())
    }
    inject('captcha', execute)
  }
  Vue.component('captcha', component)
}
