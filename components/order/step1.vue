<template>
  <article class="py-7 w-75 mx-auto">
    <h1 class="fs-3 fs-lg-2 fw-bold text-center default mb-3">預約須知</h1>
    <ol class="fs-5 fs-lg-4 lh-lg mb-3">
      <li v-for="(item, index) in orderContent" :key="index">
        {{ index + 1 }}. {{ item }}
      </li>
    </ol>
    <div class="text-center py-5">
      <button type="button" class="btn btn-secondary btn-lg" @click="nextStep">
        我已知曉
      </button>
    </div>
  </article>
</template>
<script setup lang="ts">
const route = useRoute()
const orderContent = ref<string[]>([
  '每品項最多可二人同作, 第三人需獨立製作一份甜點。',
  '因安全考量,無論是否有大人陪同,12歲以下小朋友都無法入場。 (為避免爭議,請攜帶可證明年齡之相關證件,供必要時核對)',
  '所有訂位『僅保留10分鐘』須全員到齊,逾時請現場候位。',
  '甜點製作環境,寵物無法入店。',
  '店內嚴禁:外食、菸、酒、檳榔。',
  '甜點製作為:平板教學+自助取材料。(無老師教學、無販售成品、需自行清洗用具)',
  '費用依『甜點價格』收費。(無服務費)',
  '訂位時間僅開放到前一個月。',
])

onMounted(() => {
  if (route.name && ['place'].includes(route.name as string)) {
    orderContent.value = [
      '場地租借最低人數為 5 人(含)起，一次預約不可超過 15 人。',
      '租借費用為 1500元 / 時, 若超出時間半小時內加收 500 元, 超過半小時以一小時費用計算。',
      '租借服務含食譜、烘培用具、食譜相關材料,若有需其他非食譜提供材料不另外提供。',
      '每次預約上限時間為 4 小時。',
      '因安全考量,無論是否有大人陪同,12歲以下小朋友都無法入場。 (為避免爭議,請攜帶可證明年齡之相關證件,供必要時核對)',
      '甜點製作環境,寵物無法入店。',
      '店內嚴禁:外食、菸、酒、檳榔。',
      '甜點製作為:平板教學+自助取材料。(無老師教學、無販售成品、需自行清洗用具)',
      '訂位時間僅開放到前一個月。',
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
