<template>
  <article class="py-7 w-75 w-xl-50 mx-auto position-relative">
    <div ref="download" class="p-3">
      <div class="border border-2 border-secondary p-5 mb-4 shadow-sm fs-4">
        <h1 class="fs-3 fs-lg-2 fw-bold text-center default mb-5">
          {{ $t('order.placeStep3') }}
        </h1>
        <div class="d-flex align-items-center gap-3 mb-3">
          <p class="mb-0 fw-bold">
            {{ $t('order.id') }}: <span class="ms-3">{{ userOrder.id }}</span>
          </p>
          <nuxt-icon
            name="copy"
            class="pointer"
            @click="copyText(userOrder.id)"
          ></nuxt-icon>
        </div>
        <p class="mb-8 fw-bold">
          {{ $t('order.date') }}:
          <span class="ms-3">{{ userOrder.user.orderDate }}</span>
        </p>
        <p class="fw-bold">
          {{ $t('order.userName') }}:
          <span class="ms-3">{{ userOrder.user.name }}</span>
        </p>
        <p class="fw-bold">
          {{ $t('order.contactInfo') }}:
          <span class="ms-3">{{ userOrder.user.tel }}</span>
        </p>
        <template v-if="singleOrder">
          <p class="fw-bold">
            {{ $t('product.productItem') }}:
            <span class="ms-3">{{
              userOrder.user.productId
                ? userOrder.user.productData.title
                : $t('product.inStore')
            }}</span>
          </p>
          <p class="mb-5 fw-bold">
            {{ $t('order.userBirth') }}:
            <span class="ms-3">{{ userOrder.user.birth }}</span>
          </p>
        </template>
        <template v-else>
          <p class="fw-bold">
            {{ $t('order.totalNum') }}:
            <span class="ms-3">{{ userOrder.user.totalPerson }} 人</span>
          </p>
          <p class="mb-5 fw-bold">
            {{ $t('order.totalTime') }}:
            <span class="ms-3"
              >{{ userOrder.user.totalTime }} {{ $t('common.hour') }}</span
            >
          </p>
        </template>
        <p class="text-end fw-bold fs-4 text-danger">
          {{ totalPrice }}
        </p>
        <div
          v-if="!singleOrder"
          class="remark p-3 fs-5 fw-bold border-top border-2 border-secondary"
        >
          <p class="mb-1">{{ $t('order.userRemark') }}</p>
          <p class="mb-0">{{ userOrder.message }}</p>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-between gap-3">
      <button
        type="button"
        class="btn btn-primary fs-5 py-3 flex-grow-1"
        @click="pdfDownload(download)"
      >
        {{ $t('order.remit') }}
      </button>
      <NuxtLink to="/" class="btn btn-secondary fs-5 py-3 flex-grow-1">
        {{ $t('common.finish') }}
      </NuxtLink>
    </div>
    <img
      class="position-absolute start-100 bottom-10 d-none d-xl-block"
      src="../../assets/img/thanks.png"
      alt=""
      width="230"
    />
  </article>
</template>
<script setup lang="ts">
import html2Canvas from 'html2canvas'
import Jspdf from 'jspdf'
import Order from '@/store/order'
import type { viewUserOrder } from '@/interface/order'

// 匯出 pdf

const orderStore = Order()

const userOrder: ComputedRef<viewUserOrder> = computed(
  () => orderStore.userOrder,
)
const totalPrice: ComputedRef<string> = computed(() => {
  if (userOrder.value.user.productId) {
    return moneyFormat(userOrder.value.total)
  }
  if (userOrder.value.user.totalPerson >= 5) {
    // 場地租借
    return moneyFormat(1500 * userOrder.value.user.totalTime)
  }
  return i18nT('order.inStorePrice')
})
onMounted(() => {
  nextTick(() => {
    orderStore.viewOrder()
  })
})

const singleOrder: boolean = ['order'].includes(useRoute().name as string)
const download = ref<HTMLElement | null>(null)

function pdfDownload(dom: HTMLElement | null) {
  if (!dom) return
  // 获取页面标题，作为文件名称，也可以使用时间戳生成不重复的文件名使用
  const title = 'order'
  html2Canvas(dom, {
    allowTaint: true,
    // 防止页面过宽导致右侧出现黑灰色背景区域
    scale: 2,
  }).then((canvas) => {
    const contentWidth = canvas.width
    const contentHeight = canvas.height
    // A4纸张标准宽高进行转换
    const pageHeight = (contentWidth / 592.28) * 841.89
    let leftHeight = contentHeight
    let position = 0
    const imgWidth = 595.28
    const imgHeight = (592.28 / contentWidth) * contentHeight
    const pageData = canvas.toDataURL('image/jpeg', 1.0)
    const PDF = new Jspdf('p', 'pt', 'a4')
    if (leftHeight < pageHeight) {
      PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
    } else {
      while (leftHeight > 0) {
        PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
        leftHeight -= pageHeight
        position -= 841.89
        if (leftHeight > 0) {
          PDF.addPage()
        }
      }
    }
    // 文件导出生成
    PDF.save(title + '.pdf')
  })
}
async function copyText(text: string) {
  await navigator.clipboard.writeText(text)
  useSwal({
    title: i18nT('success.copy'),
    showConfirmButton: false,
    timer: 3000,
  })
}
</script>
<style lang="scss" scoped></style>
