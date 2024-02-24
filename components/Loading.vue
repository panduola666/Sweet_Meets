<template>
  <div class="loading d-flex align-items-center justify-content-center overflow-hidden blur" v-if="loadingStore.isLoading">
    <img src="../assets/img/common/LogoIcon.png" alt="LogoIcon" class="LogoIcon">
    <!-- Loading..... -->
  </div>
</template> 
<script setup lang="ts">
import Loading from '@/store/loading';

const loadingStore = Loading()
const nuxtApp = useNuxtApp();

onMounted(() => {
  loadingStore.changeLoading(true)
})

nuxtApp.hook('page:start', () => {
  loadingStore.changeLoading(true)
  });
nuxtApp.hook('page:finish', () => {
  loadingStore.changeLoading(false)
  });
</script>
<style lang="scss" scoped>
.loading{
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba($color: $black, $alpha: .2);
  z-index: 1057; // swal->1060  bsModal->1056
}

.LogoIcon{
  animation: loading 2s linear infinite;
}
@keyframes loading {
  0% {
    transform: rotate(0deg) scale(1.5);
  }
  100% {
    transform: rotate(360deg) scale(1.5);
  }
}
</style>