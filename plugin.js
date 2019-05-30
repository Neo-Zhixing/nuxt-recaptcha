const options = <%= serialize(options) %>

const ready = new Promise((resolve, reject) => {
  if (window.grecaptcha)
    window.grecaptcha.ready(resolve)
  else
    reject(new Error('reCaptcha not loaded'))
})

function execute(action) {
  return ready.then(() => window.grecaptcha.execute(options.key, { action }))
}

export default function (_, inject) {
  inject('captcha', execute)
}
