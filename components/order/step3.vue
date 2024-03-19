<template>
  <div class="p-7">
    <div class="row g-5 mb-3">
      <article class="col-12 col-lg-5 mb-3 fw-bold">
        <h2 class="fs-4 fs-lg-3 fw-bold default mb-4 mb-lg-7">確認資料</h2>
        <p class="mb-1">
          {{ $t('order.userName') }}:
          <span class="ms-3">{{ placeOrder.user.name }}</span>
        </p>
        <p class="fw-bold">
          {{ $t('order.contactInfo') }}:
          <span class="ms-3">{{ placeOrder.user.tel }}</span>
        </p>
        <p class="mb-1 fw-bold">
          {{ $t('order.date') }}:
          <span class="ms-3">{{ placeOrder.user.orderDate }}</span>
        </p>
        <p class="mb-1 fw-bold">
          {{ $t('order.totalNum') }}:
          <span class="ms-3">{{ placeOrder.user.totalPerson }} 人</span>
        </p>
        <p class="mb-3 fw-bold">
          {{ $t('order.totalTime') }}:
          <span class="ms-3"
            >{{ placeOrder.user.totalTime }} {{ $t('common.hour') }}</span
          >
        </p>
        <div class="remark py-3 fw-bold border-top border-2 border-secondary">
          <p class="mb-1">{{ $t('order.userRemark') }}</p>
          <p class="mb-0">{{ placeOrder.message }}</p>
        </div>
      </article>

      <div class="col-12 col-lg">
        <h1 class="fs-4 fs-lg-3 fw-bold default mb-4 mb-lg-7">
          {{ $t('order.cardInfo') }}
        </h1>
        <div class="mb-3">
          <label for="cardNum1" class="form-label fw-bold">{{
            $t('order.cardNumber')
          }}</label>
          <div class="row">
            <div
              v-for="(item, index) in cardInfo.cardNumber"
              :key="index"
              class="col-3 cardNum"
            >
              <input
                :id="`cardNum${index}`"
                ref="cardNumRef"
                v-model="cardInfo.cardNumber[index]"
                v-number
                type="text"
                class="form-control"
                maxlength="4"
              />
            </div>
          </div>
        </div>
        <div class="mb-3">
          <label for="cardDate" class="form-label fw-bold">{{
            $t('order.cardValid')
          }}</label>
          <div class="row g-3">
            <div class="col-3 d-flex align-items-center gap-3">
              <input
                id="cardDate"
                ref="month"
                v-model="cardInfo.month"
                v-number
                type="text"
                class="form-control"
                maxlength="2"
              />
              /
            </div>
            <div class="col-3 d-flex align-items-center gap-3">
              <input
                id="cardDate"
                ref="year"
                v-model="cardInfo.year"
                v-number
                type="text"
                class="form-control"
                maxlength="2"
              />
              {{ $t('common.yearStr') }}
            </div>
          </div>
        </div>
        <div class="mb-3 row">
          <label for="cardCode" class="form-label fw-bold col-12">{{
            $t('order.cardSafe')
          }}</label>
          <div class="col-3">
            <input
              id="cardCode"
              v-model="cardInfo.safeCode"
              v-number
              type="text"
              class="form-control"
              maxlength="3"
            />
          </div>
        </div>
      </div>

      <div class="col-12 d-flex justify-content-end gap-9 fs-4 fw-bold my-5">
        <span>{{ $t('order.totalPrice') }}</span>
        <span class="text-danger">{{
          moneyFormat(1500 * placeOrder.user.totalTime)
        }}</span>
      </div>
    </div>
    <ol class="alert alert-primary lh-lg mb-3" role="alert">
      <li v-for="(item, index) in tips" :key="index">
        {{ index + 1 }}. {{ item }}
      </li>
    </ol>
    <div class="d-flex justify-content-end gap-3">
      <button
        type="reset"
        class="btn btn-primary fs-5 px-6"
        @click="changeStep(-1)"
      >
        {{ $t('order.reEdit') }}
      </button>
      <button
        type="button"
        class="btn btn-secondary fs-5 px-6"
        @click="payCheck"
      >
        {{ $t('order.payNow') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Order from '@/store/order'

interface propsType {
  currStep: number
}

const props = defineProps<propsType>()
const orderStore = Order()

const cardInfo = ref({
  cardNumber: ['', '', '', ''],
  month: '',
  year: '',
  safeCode: '',
})

const placeOrder = computed(() => orderStore.placeOrder)

async function payCheck() {
  const { cardNumber, month, year, safeCode } = cardInfo.value
  if (!month || !year || !safeCode || !cardNumber.some(Boolean)) {
    useSwal({
      title: i18nT('error.cardInfo'),
      showConfirmButton: false,
      timer: 3000,
    })
    return
  }
  if (Number(month) > 12) {
    useSwal({
      title: i18nT('error.errorDate'),
      showConfirmButton: false,
      timer: 3000,
    })
    return
  }
  await orderStore.createOrder(placeOrder.value)

  const res = await orderStore.payOrder(
    localStorage.getItem('orderId') as string,
  )

  if (res.success) {
    changeStep(1)
  } else {
    useSwal({
      title: res.message || i18nT('error.paid'),
      showConfirmButton: false,
      timer: 3000,
    })
  }
}

const tips = [
  i18nT('order.rule10'),
  i18nT('order.rule2'),
  i18nT('order.rule13'),
]

// 換頁
const emit = defineEmits(['click'])
function changeStep(page: number) {
  emit('click', props.currStep + Number(page))
}

// 信用卡號自動 focus
const cardNumRef = ref()
watch(
  () => cardInfo.value.cardNumber[0],
  (val) => {
    if (val.length === 4) cardNumRef.value[1].focus()
  },
)
watch(
  () => cardInfo.value.cardNumber[1],
  (val) => {
    if (val.length === 4) cardNumRef.value[2].focus()
  },
)
watch(
  () => cardInfo.value.cardNumber[2],
  (val) => {
    if (val.length === 4) cardNumRef.value[3].focus()
  },
)
</script>

<style lang="scss" scoped>
.cardNum {
  position: relative;
  z-index: 2;
  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    width: 0.5rem;
    border: 1px solid #000;
    top: 50%;
    left: 100%;
    transform: translate(-50%, -50%);
  }
  &:nth-last-child(1)::before {
    display: none;
  }
}
</style>
