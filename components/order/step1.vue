<template>
  <article class="py-7 w-75 mx-auto">
    <h1 class="fs-3 fs-lg-2 fw-bold text-center default mb-3">
      {{ $t('order.step1') }}
    </h1>
    <ol class="fs-5 fs-lg-4 lh-lg mb-3">
      <li v-for="(item, index) in orderContent" :key="index">
        {{ index + 1 }}. {{ item }}
      </li>
    </ol>
    <div class="text-center py-5">
      <button type="button" class="btn btn-secondary btn-lg" @click="nextStep">
        {{ $t('common.iKnow') }}
      </button>
    </div>
  </article>
</template>

<script setup lang="ts">
const route = useRoute()
const orderContent = ref<string[]>([
  i18nT('order.rule1'),
  i18nT('order.rule2'),
  i18nT('order.rule3'),
  i18nT('order.rule4'),
  i18nT('order.rule5'),
  i18nT('order.rule6'),
  i18nT('order.rule7'),
  i18nT('order.rule8'),
])

onMounted(() => {
  if (route.name && ['place'].includes(route.name as string)) {
    orderContent.value = [
      i18nT('order.rule9'),
      i18nT('order.rule10'),
      i18nT('order.rule11'),
      i18nT('order.rule12'),
      i18nT('order.rule2'),
      i18nT('order.rule4'),
      i18nT('order.rule5'),
      i18nT('order.rule6'),
      i18nT('order.rule8'),
    ]
  }
})
interface propsType {
  currStep: number
}
const props = defineProps<propsType>()
const emit = defineEmits(['click'])
function nextStep() {
  emit('click', props.currStep + 1)
}
</script>
