// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: { // 環境變數
    public: {
      baseUrl: '',
      apiPath: ''
    }
  },
  modules: ['nuxt-swiper', '@nuxtjs/i18n', '@vee-validate/nuxt', '@samk-dev/nuxt-vcalendar', 'nuxt-icons', '@pinia/nuxt'],
  i18n: {
    vueI18n: './i18n.config.ts' // if you are using custom path, default 
  },
  swiper: {
    // modules: ['navigation', 'pagination', 'effect-creative' ]
  },
  veeValidate: {
    // 啟用 auto imports
    autoImports: true,
    // 更換 components 名稱
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    }
  },
  app:{ // SEO and Meta
    head: {
      charset: 'UTF-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'zh-TW'
      },
      meta:[
        { name: 'keywords', content: 'DIY甜點,自己做甜點,台北DIY' },
        { name: 'title', content: 'DIY甜點俱樂部|相遇甜點' },
        { name: 'description', content: '想自己DIY動手做甜點，無奈做一次需要用到各種材料及用具嗎？這裡已經把需要的材料用具全部備齊，還等甚麼？趕快來報名吧！預約時段：12:00-21:00，地址：(100)台北市中正區鄭州路8號' },
        { name: 'og:title', content: 'DIY甜點俱樂部|相遇甜點' },
        { name: 'og:description', content: '想自己DIY動手做甜點，無奈做一次需要用到各種材料及用具嗎？這裡已經把需要的材料用具全部備齊，還等甚麼？趕快來報名吧！預約時段：12:00-21:00，地址：(100)台北市中正區鄭州路8號' },
        { name: 'og:image', content: 'https://github.com/panduola666/Sweet_Meets/blob/master/assets/img/Logo.png?raw=true' },
        { name: 'og:url', content: 'https://sweetmeets.onrender.com' },
        { name: 'og:site_name', content: '相遇甜點' },
        { name: 'og:locale', content: 'zh_TW' },
        { name: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'robots', content: 'index,follow' },
        { name: 'author', content: '圈圈' },
      ]
    }
  },
  experimental: {
    payloadExtraction: false
  },
  ssr: false,
  // css: ['~/assets/css/main.scss'], // 全局樣式導入
  vite:{
    optimizeDeps: {
      exclude: ['vee-validate', '@vee-validate/rules', '@vee-validate/i18n']
    },
    css: { // 在 .vue 內可只用 scss 變數
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./assets/css/main.scss";`
        }
      }
    },
    build: {
      chunkSizeWarningLimit: 1600,
    },
  },
  postcss: { // CSS 屬性加上瀏覽器相容性前綴
    plugins: {
        autoprefixer: true
    }
  },
  devtools: { enabled: true },
})
