<template>
  <NuxtLayout name="default">
    <div class="banner mx-3 mx-lg-9 position-relative">
      <img src="../../assets/svg/banner.svg" alt="banner" class="d-none d-lg-block w-100 rounded-4">
      <img src="../../assets/svg/banner-sm.svg" alt="banner" class="d-lg-none w-100 rounded-4">
      <section class="banner-content blur boxShadow p-6 p-lg-7">
        <h1 class="fs-2 fw-bold mb-6 mb-lg-7">相遇甜點，<br>開始甜蜜相約</h1>
        <button type="button" class="btn btn-secondary fs-lg-3 w-100 py-3">開始課程</button>
      </section>
    </div>
  </NuxtLayout>
</template>
<style lang="scss" scoped>
.banner-content{
  position: absolute;
  background: rgba($color: #fff, $alpha: 0.5);
  top: 24px;
  left: 24px;
  right: 24px;
  @include lg{
    top: 15%;
    left: 10%;
    width: 40%;
    right: auto;
  }
}
</style>