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
      let str = el.value
      el.value = str.toString().replace(regExp, '');
    }
  });
  el.addEventListener('blur', (event) => {
    if (el.tagName === 'INPUT') {
      let str = el.value
      el.value = str.toString().trim();
    }
  });
}
