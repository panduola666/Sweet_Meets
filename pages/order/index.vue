<template>
  <NuxtLayout name="default">
    <div class="container">
      <div class="w-lg-75 mx-auto">
        <step-nav :steps="steps" :currStep="currStep"/>
        <div class="bg-white bg-opacity-50 order-shadow rounded-4">
          <OrderStep1 v-if="currStep === 0" :currStep="currStep" @click="changStep"/>
          <OrderStep2 v-if="currStep === 1" :currStep="currStep" @click="changStep"/>
          <OrderFinal v-if="currStep === steps.length - 1"/>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
<script setup lang="ts">
const steps = ref<string[]>(['預約須知', '填寫資料', '訂單完成'])
const currStep = ref<number>(0)

function changStep(stepIndex: number) {
  currStep.value = stepIndex
  window.scrollTo(0, 0)
}
</script>
<style lang="scss" scoped>
.order-shadow {
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.25);
}
</style>
