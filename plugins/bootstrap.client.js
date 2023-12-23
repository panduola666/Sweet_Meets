// plugins/bootstrap.client.js
// Nuxt 會自動引入（auto imports）plugins，bootstrap plugins 要限制在 client 端使用，否則會拋錯 document is not defined ，檔名需加上 .client 後綴
import * as bootstrap from 'bootstrap';
const { Modal, Collapse } = bootstrap;

export default defineNuxtPlugin(_nuxtApp => {
  return {
    provide: {
      bootstrap: {
        modal: element => new Modal(element),
        collapse: element => new Collapse(element)
      }
    }
  };
});

/**
 * 使用方式
 * const { $bootstrap } = useNuxtApp();
 * let modal = $bootstrap.modal(modalRef.value);
 */