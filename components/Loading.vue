<template>
  <div v-if="loadingStore.isLoading">
    <!-- Loading..... -->
  </div>
</template> 
<script setup lang="ts">
import Loading from '@/store/loading';

const loadingStore = Loading()

const nuxtApp = useNuxtApp();
nuxtApp.hook('page:start', () => {
  loadingStore.changeLoading(true)
  });
</script>
<style lang="scss" scoped>

</style>