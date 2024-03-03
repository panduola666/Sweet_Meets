<template>
  <Head>
    <Title>{{ pageTitle }}</Title>
    <Meta name="description" content="相遇甜點" />
  </Head>
  <div>
    <Loading />
    <NuxtPage />
  </div>
</template>
<script setup lang="ts">
import Config from '@/store/routeConfig'

const routeConfig = Config()
const route = useRoute();

const pageTitle: ComputedRef<string> = computed(() => routeConfig.pageTitle)

onMounted(() => {
  routeConfig.changeTitle(route.name as string)
})
watch(() => route.fullPath, () => {
  routeConfig.changeTitle(route.name as string)
})
</script>
<style lang="scss">
// @import './assets/css/main.scss';
</style>