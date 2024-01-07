// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['nuxt-swiper', '@nuxtjs/i18n', '@vee-validate/nuxt', '@samk-dev/nuxt-vcalendar', 'nuxt-icons'],
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
  app:{ // 部屬配置
    baseURL: process.env.NODE_ENV === 'production' ? '/Sweet_Meets/' : '/',
    buildAssetsDir: "/static/",
  },
  experimental: {
    payloadExtraction: false
  },
  ssr: true,
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
    }
  },
  postcss: { // CSS 屬性加上瀏覽器相容性前綴
    plugins: {
        autoprefixer: true
    }
  },
  devtools: { enabled: true },
})
