import zh_CN from './locales/zh_CN'
import zhTW from './locales/zh_TW'
export default defineI18nConfig(() => ({
  legacy: false,
  locale: localStorage.getItem('lang') || 'zh_TW',
  defaultLocale: 'zh_TW',
  messages: {
    zh_CN,
    zh_TW: zhTW,
  },
}))
