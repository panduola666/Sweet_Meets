<template>
  <NuxtLayout name="back" :breadPath="['壽星優惠']">
    <div>
      <div class="text-end mb-3">
        <nuxt-link to="/admin/products/0" class="btn btn-lg btn-secondary px-6">新增甜點</nuxt-link>
      </div>
      <div class="row">
        <aside class="col-2">
          <ul class="bg-white mx-auto fs-4 fw-bold text-center">
            <li class="p-3 border-bottom pointer" v-for="item in aside" :key="item">{{ item }}</li>
          </ul>
        </aside>
        <div class="col bg-danger" style="min-height: 200vh;">2</div>
      </div>
  </div>
  </NuxtLayout>
</template>
<script setup lang="ts">
const aside = ref<string[]>(['壽星優惠', '蛋糕', '餅乾', '塔派'])
</script>