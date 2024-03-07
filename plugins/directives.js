const reg = {
  number: /[^0-9]/g,
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('number', {
    mounted(el) {
      keyUpEvent(el, reg.number)
    },
  })
})

// 綁定事件
function keyUpEvent(el, regExp) {
  el.addEventListener('keyup', () => {
    if (el.tagName === 'INPUT') {
      const str = el.value
      el.value = str.toString().replace(regExp, '')
    }
  })
  el.addEventListener('blur', () => {
    if (el.tagName === 'INPUT') {
      const str = el.value
      el.value = str.toString().trim()
    }
  })
}
