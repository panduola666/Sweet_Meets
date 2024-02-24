<template>
  <div class="p-7">
    <div class="row g-5 mb-3">
      <article class="col-12 col-lg-5 mb-3 fw-bold">
        <h2 class="fs-4 fs-lg-3 fw-bold default mb-4 mb-lg-7">確認資料</h2>
        <p class="mb-1">姓名: <span class="ms-3">張三</span></p>
        <p class="fw-bold">聯繫方式: <span class="ms-3">09*****546</span></p>
        <p class="mb-1 fw-bold">
          預約日期: <span class="ms-3">2016/05/15 20:00</span>
        </p>
        <p class="mb-1 fw-bold">人數: <span class="ms-3">6 人</span></p>
        <p class="mb-3 fw-bold">預約時數: <span class="ms-3">2 小時</span></p>
        <div class="remark py-3 fw-bold border-top border-2 border-secondary">
          <p class="mb-1">備註</p>
          <p class="mb-0">我們會自己另外帶一些包裝材料, 後續會清理乾淨</p>
        </div>
      </article>

      <div class="col-12 col-lg">
        <h1 class="fs-4 fs-lg-3 fw-bold default mb-4 mb-lg-7">信用卡付款資訊</h1>
        <div class="mb-3">
          <label for="cardNum1" class="form-label fw-bold">信用卡號</label>
          <div class="row">
            <div class="col-3 cardNum" v-for="i in 4" :key="i">
              <input type="text" class="form-control" :id="`cardNum${i}`" :ref="`cardNum${i}`" maxlength="4" />
            </div>
          </div>
        </div>
        <div class="mb-3">
          <label for="cardDate" class="form-label fw-bold">有效月年</label>
          <div class="row g-3">
            <div class="col-3 d-flex align-items-center gap-3">
              <input type="text" class="form-control" id="cardDate" ref="month" maxlength="2" />
              /
            </div>
            <div class="col-3 d-flex align-items-center gap-3">
              <input type="text" class="form-control" id="cardDate" ref="year" maxlength="2" />
              年
            </div>
          </div>
        </div>
        <div class="mb-3 row">
          <label for="cardCode" class="form-label fw-bold col-12">背面末三碼</label>
          <div class="col-3">
            <input type="text" class="form-control" id="cardCode" maxlength="3" />
          </div>
        </div>
      </div>

      <div class="col-12 d-flex justify-content-end gap-9 fs-4 fw-bold my-5">
        <span>總費用</span>
        <span class="text-danger">$3000</span>
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
        修改資料
      </button>
      <button
        type="button"
        class="btn btn-secondary fs-5 px-6"
        @click="changeStep(1)"
      >
        確認繳費
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
// import Order from '@/store/order'
// import type { viewUserOrder } from '@/interface/order';

// const props = defineProps(['currStep']);
// const orderStore = Order()

// const userOrder: ComputedRef<viewUserOrder> = computed(() => orderStore.userOrder)
// onMounted(() => {
//   nextTick(() => {
//     orderStore.viewOrder()
//   })
// })

const tips = [
  '租借費用為 1500元 / 時, 若超出時間半小時內加收 500 元, 超過半小時以一小時費用計算。',
  '因安全考量,無論是否有大人陪同,12歲以下小朋友都無法入場。 (為避免爭議,請攜帶可證明年齡之相關證件,供必要時核對)',
  '甜點製作環境,寵物無法入店, 嚴禁:外食、菸、酒、檳榔。',
];

// 換頁
const emit = defineEmits(['click']);
function changeStep(page: number) {
  emit('click', props.currStep + Number(page));
}
</script>
<style lang="scss" scoped>
.cardNum{
  position: relative;
  z-index: 2;
  &::before{
    content: '';
    position: absolute;
    z-index: -1;
    width: .5rem;
    border: 1px solid #000;
    top: 50%;
    left: 100%;
    transform: translate(-50%, -50%);
  }
  &:nth-last-child(1)::before{
    display: none;
  }
}
</style>