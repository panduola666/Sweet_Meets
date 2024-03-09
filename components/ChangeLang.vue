<template>
  <div class="changeLang">
    <div
      v-for="lang in langKey"
      :key="lang"
      class="currLang rounded-circle pointer mb-3"
      :class="{ active: locale === lang }"
      @click="changeLanguage(lang)"
    >
      {{ langStr[lang] }}
    </div>
    <!-- <ul class="langSelect text-center">
      <li v-for="lang in langKey" :key="lang" @click="changeLanguage(lang)">
        {{ langStr[lang] }}
      </li>
    </ul> -->
  </div>
</template>

<script setup lang="ts">
//
import { setLocale as veeSetLocale } from '@vee-validate/i18n'
const { locale, setLocale } = useI18n()

interface langObj {
  [key: string]: string
}
const langKey: string[] = ['zh_TW', 'zh_CN']
const langStr: ComputedRef<langObj> = computed(() => {
  return {
    zh_TW: '繁',
    zh_CN: '简',
  }
})

const changeLanguage = (lang: string) => {
  veeSetLocale(lang)

  setLocale(lang)
  locale.value = lang
  localStorage.setItem('lang', lang)
}
</script>
<style lang="scss" scoped>
.changeLang {
  position: fixed;
  right: 1rem;
  background: $primary;
  z-index: 9999999;
  padding: 0.25rem;
  border-radius: 3rem;
  box-shadow: 2px 1px 5px #000;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
}
.currLang {
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  background: #fff;
  &:hover {
    background: #f9f9f9;
  }
  &.active {
    background: $secondary;
    color: #fff;
  }
}
</style>
