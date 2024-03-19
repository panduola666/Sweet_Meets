<template>
  <div
    class="bg-circle min-vh-100 d-flex align-items-center justify-content-center"
  >
    <div class="d-flex align-items-center gap-3">
      <img src="../assets/img/common/LogoIcon.png" alt="" />
      <div class="text-center">
        <h1 class="title fw-bold">404</h1>
        <div class="d-flex align-items-center gap-5">
          <p class="h3 fw-bold">{{ $t('error.notFound') }}</p>
          <nuxt-link to="/" class="btn btn-lg btn-secondary">{{
            $t('route.backHome')
          }}</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.bg-circle {
  background: radial-gradient(circle, $primary, $secondary);
}
.title {
  font-size: 8rem;
}
</style>
