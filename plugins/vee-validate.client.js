import { defineRule, configure } from 'vee-validate'
import { required, email, min, integer, min_value } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '../locales/zh_TW.json'

// 加入規則
defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
defineRule('min_value', min_value)
defineRule('integer', integer)

/** 配置訊息

 * 調整觸發行為
  validateOnBlur：離開焦點時觸發，預設 true
  validateOnChange：欄位在 change 事件觸發，預設 true
  validateOnInput：輸入內容時觸發，預設 false
  validateOnModelUpdate：update:modelValue (v-model) 事件觸發，預設 true
 */
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
})

setLocale('zh_TW')

// 必須定義，用來封裝 plugin
export default defineNuxtPlugin((_nuxtApp) => {})
