const reg = {
  number: /[^0-9]/g,
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('number', {
    mounted(el) {
      keyUpEvent(el, reg.number);
    },
  });
});

// 綁定事件
function keyUpEvent(el, regExp) {
  el.addEventListener('keyup', (event) => {
    if (el.tagName === 'INPUT') {
      el.value = el.value.toString().replace(regExp, '');
    }
  });
}
