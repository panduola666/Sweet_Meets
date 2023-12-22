// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['nuxt-swiper'],
  swiper: {
    // modules: ['navigation', 'pagination', 'effect-creative' ]
  },
  app:{
    baseURL: process.env.NODE_ENV === 'production' ? '/Sweet_Meets/' : '/',
    buildAssetsDir: "/static/",
  },
  experimental: {
    payloadExtraction: false
  },
  ssr: true,
  // css: ['~/assets/css/main.scss'], // 全局樣式導入
  vite:{
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
