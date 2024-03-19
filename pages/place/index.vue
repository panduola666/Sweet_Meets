<template>
  <div>
    <NuxtLayout name="default">
      <div class="container">
        <div class="w-lg-75 mx-auto">
          <step-nav :steps="steps" :curr-step="currStep" />
          <div class="bg-white bg-opacity-50 order-shadow rounded-4">
            <OrderStep1
              v-if="currStep === 0"
              :curr-step="currStep"
              @click="changStep"
            />
            <OrderStep2
              v-if="currStep === 1"
              :curr-step="currStep"
              @click="changStep"
            />
            <OrderStep3
              v-if="currStep === 2"
              :curr-step="currStep"
              @click="changStep"
            />
            <OrderFinal v-if="currStep === steps.length - 1" />
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import Carts from '@/store/cart'
import Order from '@/store/order'

const cartStore = Carts()
const orderStore = Order()

const steps: ComputedRef<string[]> = computed(() => [
  i18nT('order.placeStep1'),
  i18nT('order.step2'),
  i18nT('order.placeStep2'),
  i18nT('order.placeStep3'),
])
const currStep = ref<number>(0)

function changStep(stepIndex: number) {
  currStep.value = stepIndex
  window.scrollTo(0, 0)
}

onBeforeRouteLeave(async () => {
  await cartStore.checkCart()
  if (cartStore.carts.length) {
    cartStore.clearCart()
  }
  orderStore.resetPlaceOrder()
})
</script>

<style lang="scss" scoped>
.order-shadow {
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.25);
}
</style>
