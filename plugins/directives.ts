export default defineNuxtPlugin((nuxtApp) => {
  const reg = {
    number: /[^0-9]/g
  }
  nuxtApp.vueApp.directive('number', {
    mounted (el) {
      el.addEventListener('input', (el: HTMLInputElement) => {
        if(el.target.tagName === 'INPUT') {
          el.target.value =  el.target.value.replace(reg.number, '')
        }
      })
    }
  })
})
