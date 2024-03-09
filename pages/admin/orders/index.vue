<template>
  <div>
    <NuxtLayout name="back">
      <div class="row">
        <!-- 左側表格 -->
        <div class="col-12 col-lg-9 position-relative">
          <div class="d-flex align-items-center justify-content-end gap-3 mb-3">
            <button
              type="button"
              class="btn btn-outline-secondary"
              :class="{ disabled: !currOrder.id }"
              @click="deleteOrder"
            >
              {{ $t('order.cancel') }}
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              :class="{ disabled: disabledCheck }"
              @click="checkIn"
            >
              {{ $t('order.checkIn') }}
            </button>
          </div>
          <div class="table-responsive" :class="{ 'opacity-25': isDrag }">
            <table
              class="table table-bordered align-middle text-center table-hover"
            >
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">{{ $t('order.userName') }}</th>
                  <th scope="col">{{ $t('order.orderTime') }}</th>
                  <th scope="col">{{ $t('order.userTel') }}</th>
                  <th scope="col">{{ $t('order.orderItem') }}</th>
                  <th scope="col">{{ $t('order.price') }}</th>
                </tr>
              </thead>
              <VueDraggableNext
                v-model="fakeOrders"
                :sort="false"
                group="list"
                tag="tbody"
                class="fs-lg-5"
                handle=".mover"
                @change="onChange"
                @start="onStart"
                @end="onEnd"
              >
                <tr
                  v-for="(order, index) in orders"
                  :key="order.id"
                  :class="{
                    'table-active': currOrder.id === order.id,
                    mover:
                      new Date(order.user.orderDate).getTime() >=
                      new Date().getTime() + 10 * 60 * 1000,
                  }"
                  @click="currOrder = order"
                >
                  <th scope="row">{{ index + 1 }}</th>
                  <td class="text-nowrap position-relative">
                    {{ order.user.name }}
                    <NuxtIcon
                      v-if="order.message"
                      name="info"
                      class="pointer fs-6 ms-2"
                      data-bs-toggle="modal"
                      data-bs-target="#remark"
                      @click="remark = order.message"
                    />
                  </td>
                  <td
                    class="text-nowrap"
                    :class="{
                      'text-danger text-decoration-line-through': isOverTime(
                        order.user.orderDate,
                      ),
                    }"
                  >
                    {{ order.user.orderDate }}
                  </td>
                  <td class="text-nowrap">{{ order.user.tel }}</td>
                  <td class="text-nowrap">
                    <span v-if="getItem(order)">{{ getItem(order) }}</span>
                    <select
                      v-else
                      v-model="order.user.productId"
                      class="form-select"
                      @change="cloneFake"
                    >
                      <option value="">
                        {{ $t('placeholder.orderItem') }}
                      </option>
                      <option
                        v-for="option in productList"
                        :key="option.id"
                        :value="option.id"
                      >
                        {{ option.title }} - {{ moneyFormat(option.price) }}
                      </option>
                    </select>
                  </td>
                  <td class="text-nowrap">{{ getMoney(order) }}</td>
                </tr>
              </VueDraggableNext>
            </table>
          </div>
          <div class="mt-3 mb-6">
            <Pagination :pagination="orderStore.pagination" @click="getDate" />
          </div>
        </div>

        <!-- 右側表格 -->
        <div class="col bg-primary bg-opacity-50 py-5">
          <p class="d-flex justify-content-between fw-bold">
            <span>{{ $t('order.checkInList') }}</span>
            <span>{{ $t('order.leave') }}</span>
          </p>
          <div class="position-relative bg-primary-subtle">
            <p
              v-if="isDrag"
              class="position-absolute start-0 bg-white text-center fs-5 w-100 fw-bold mb-0 z-3"
              style="top: -20px; border: 5px double red"
            >
              {{ $t('order.dragTip') }}
            </p>

            <VueDraggableNext
              handle=".mover"
              group="list"
              tag="ul"
              class="mb-5 checkList p-3 position-relative"
            >
              <li class="position-absolute top-50 start-50 translate-middle">
                <NuxtIcon v-if="isDrag" name="add" class="fs-1 opacity-75" />
              </li>
              <li
                v-for="item in checkInList"
                :key="item.id"
                class="d-flex align-items-center gap-3 mb-5"
                :class="{ hideDel: isDrag }"
              >
                <div
                  class="bg-white rounded-3 flex-grow-1 border border-secondary"
                >
                  <div class="d-flex flex-column fs-5 p-3">
                    <p
                      class="mb-0 d-flex align-items-center justify-content-between"
                    >
                      <span class="fw-bold">{{ item.name }}</span>
                      <small class="fs-6">{{ getTime(item.due_date) }}</small>
                    </p>
                    <p class="fw-bold mb-0">
                      {{
                        item.totalPerson >= 5
                          ? `${$t('route.place')} - ${item.totalPerson}人`
                          : item.title
                      }}
                    </p>
                    <p v-if="item.totalPerson >= 5" class="fs-6 mb-0">
                      {{ $t('order.expectedLeave') }}:
                      {{ getTime(item.final_date) }}
                    </p>
                    <p
                      class="mb-0 d-flex align-items-center justify-content-between"
                    >
                      <small
                        class="fs-6"
                        :class="{
                          'text-danger': !item.is_paid,
                          'text-success': item.is_paid,
                        }"
                        >{{
                          item.is_paid ? $t('order.paid') : $t('order.notPaid')
                        }}</small
                      >
                      <span class="fw-bold">{{ item.total }}</span>
                    </p>
                  </div>
                  <button
                    v-if="!item.is_paid"
                    type="button"
                    class="btn btn-secondary w-100 rounded-0"
                    @click="openPaidModal(item)"
                  >
                    {{ $t('order.payMoney') }}
                  </button>
                </div>
                <NuxtIcon
                  name="delete"
                  class="pointer"
                  :class="{ hideDel: !item.is_paid || isDrag }"
                  @click="checkLeave(item)"
                />
              </li>
              <li v-if="!checkInList.length && !isDrag" class="text-center">
                {{ $t('common.noData') }}
              </li>
            </VueDraggableNext>
          </div>
          <Pagination
            :pagination="couponStore.pagination"
            :hide-str="true"
            @click="getCheckIn"
          />
        </div>
      </div>

      <!-- 備註 Modal -->
      <div id="remark" class="modal fade" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header py-2">
              <h1 class="modal-title fs-5">{{ $t('order.userRemark') }}</h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body fw-bold fs-5" style="min-height: 100px">
              {{ remark }}
            </div>
          </div>
        </div>
      </div>

      <!-- 付款 Modal -->
      <div ref="paidModal" class="modal fade" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5">{{ $t('order.payCheck') }}</h1>
              <button
                type="button"
                class="btn-close"
                @click="closePaidModal"
              ></button>
            </div>
            <div class="modal-body">
              <p>
                <span class="fw-bold me-3">{{ $t('order.userName') }}:</span>
                {{ modalData.name }}
              </p>
              <div class="mb-3 d-flex align-items-center">
                <label
                  for="finalProduct"
                  class="form-label fw-bold flex-shrink-0 me-3"
                  >{{ $t('order.orderItem') }}:</label
                >
                <select
                  id="finalProduct"
                  v-model="modalData.productId"
                  class="form-select"
                >
                  <option
                    v-for="option in productList"
                    :key="option.id"
                    :value="option.id"
                  >
                    {{ option.title }} - {{ moneyFormat(option.price) }}
                  </option>
                </select>
              </div>
              <p class="d-flex justify-content-between">
                <span>{{ $t('order.price') }}:</span>
                <span class="fs-3 fw-bold">{{ getFinalPaid(modalData) }}</span>
              </p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                @click="closePaidModal"
              >
                {{ $t('order.cancelPay') }}
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                @click="paidNow(modalData)"
              >
                {{ $t('order.checkPayNow') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import { VueDraggableNext } from 'vue-draggable-next'
import type { couponData } from '@/interface/coupon'
import type { orderAdminData } from '@/interface/order'
import Order from '@/store/order'
import Products from '@/store/products'
import Coupon from '@/store/coupon'

const orderStore = Order()
const productStore = Products()
const couponStore = Coupon()

const { $bootstrap } = useNuxtApp()
const paidModal = ref(null)
let modal: any
const modalData = ref<couponData>({
  code: '',
  due_date: 0,
  final_date: 0,
  id: '',
  is_enabled: 0,
  is_paid: false,
  name: '',
  num: 0,
  productId: '',
  title: '',
  total: '',
  totalPerson: 0,
  update_date: 0,
  percent: 0,
})
const fakeOrders = ref<orderAdminData[]>([]) // 避免影響原畫面
const isDrag = ref<boolean>(false)

const disabledCheck = computed(() => {
  const { totalPerson, orderDate } = currOrder.value.user
  if (!currOrder.value.id) return true
  if (isOverTime(orderDate)) {
    // 預約超時
    return true
  }
  if (totalPerson < 5 && !currOrder.value.user.productId) {
    // 單人預約未選品項 or 超時
    return true
  }
  return false
})

function isOverTime(date: number | string | Date) {
  return new Date(date).getTime() < new Date().getTime() + 10 * 60 * 1000
}

const orders: ComputedRef<orderAdminData[]> = computed(() => orderStore.orders)
const remark = ref<string>('')
const productList: ComputedRef<{ [key: string]: any }> = computed(
  () => productStore.products || {},
)
const checkInList: ComputedRef<couponData[]> = computed(
  () => couponStore.coupons || [],
)
const currOrder = ref<orderAdminData>({
  id: '',
  total: 0,
  user: {
    name: '',
    email: '',
    tel: '',
    address: '',
    birth: '',
    orderDate: '',
    productData: {
      title: '',
      category: '',
      origin_price: 0,
      price: 0,
      unit: '',
      description: '',
      finalTime: 0,
      content: [],
      saveMethods: [],
      imageUrl: '',
      imagesUrl: [],
      is_enabled: 0,
      saveMode: 0,
    },
    totalPerson: 0,
    totalTime: 0,
    productId: '',
  },
}) // 暫存的訂單資料

onMounted(() => {
  nextTick(async () => {
    modal = $bootstrap.modal(paidModal.value)

    await productStore.adminGetAll()
    getDate(1)
    getCheckIn(1)
  })
})

function cloneFake() {
  fakeOrders.value = JSON.parse(JSON.stringify(orderStore.orders))
}
async function getDate(page: string | number) {
  await orderStore.adminGet(page)
  cloneFake()
}
async function getCheckIn(page: string | number) {
  await couponStore.adminGet(page)
}

// 付款流程 start
function openPaidModal(item: couponData) {
  if (!modal) {
    modal = $bootstrap.modal(paidModal.value)
  }
  modalData.value = item
  modal.show()
}
function closePaidModal() {
  modal.hide()
}
function getFinalPaid(data: couponData) {
  if (!data.productId) return moneyFormat(0)
  const product = productList.value[data.productId]

  return moneyFormat(product.price)
}
// 確認付款
async function paidNow(data: couponData) {
  const product = productList.value[data.productId]

  data.is_paid = true
  data.title = product.title
  data.total = moneyFormat(product.price)
  data.update_date = new Date().getTime()

  await couponStore.adminPaid(data)
  closePaidModal()
  getCheckIn(couponStore.pagination.current_page)
}
// 付款流程 end

// 離場
async function checkLeave(item: couponData) {
  const swal = await useSwal({
    title: i18nT('placeholder.checkLeave', [item.name]),
    showCancelButton: true,
    allowOutsideClick: false,
  })
  if (swal.isConfirmed && item.id) {
    await couponStore.adminLeave(item.id)
    getCheckIn(couponStore.pagination.current_page)
  }
}

// 取消預約
async function deleteOrder() {
  const swal = await useSwal({
    title: i18nT('placeholder.orderDel'),
    showCancelButton: true,
    allowOutsideClick: false,
  })
  if (swal.isConfirmed) {
    await orderStore.adminDel(currOrder.value.id)
    getDate(orderStore.pagination.current_page)
  }
}

// 預約報到
async function checkIn() {
  const { is_paid, id } = currOrder.value
  const { name, totalPerson, totalTime, productId } = currOrder.value.user

  const data: couponData = {
    name,
    productId,
    title:
      totalPerson >= 5
        ? i18nT('route.place')
        : productList.value[productId].title,
    is_enabled: 1,
    total: getMoney(currOrder.value),
    is_paid,
    percent: 100,
    totalPerson,
    due_date: new Date().getTime(), // 進場時間
    update_date: new Date().getTime(),
    final_date:
      totalPerson >= 5
        ? new Date().getTime() + Number(totalTime) * 60 * 60 * 1000
        : 0, // 離場時間
    code: '---',
  }

  await couponStore.checkIn(data)
  await orderStore.adminCheck(id)
  getCheckIn(couponStore.pagination.current_page)
  getDate(orderStore.pagination.current_page)
}
// 預約拖曳報到
function onStart() {
  isDrag.value = true
}
async function onChange(evt: any) {
  currOrder.value = evt.removed.element
  const { id, user } = currOrder.value
  if (user.totalPerson < 5 && disabledCheck.value) {
    await useSwal({
      icon: 'error',
      title: i18nT('placeholder.orderItem'),
      showConfirmButton: false,
      timer: 3000,
    })
    cloneFake()
    return
  }
  if (
    id &&
    new Date(user.orderDate).getTime() >= new Date().getTime() + 10 * 60 * 1000
  ) {
    const swal = await useSwal({
      title: i18nT('placeholder.checkCheckIn', [user.name]),
      showCancelButton: true,
      allowOutsideClick: false,
    })
    if (swal.isConfirmed) {
      checkIn()
    } else {
      // 取消需還原數據
      cloneFake()
    }
  }
}
function onEnd() {
  isDrag.value = false
}

// 取得訂單品項
function getItem(data: orderAdminData) {
  const { totalPerson, totalTime, productId, productData } = data.user
  if (totalPerson >= 5) {
    // 場地預約
    return i18nT('order.placeItem', [totalPerson, totalTime])
  } else if (productId) {
    // 已選定品項
    return productData.title
  } else {
    return '' // 現場選擇
  }
}

// 取得訂單金額
function getMoney(data: orderAdminData) {
  if (!productList.value || !data) return moneyFormat(0)
  const { totalPerson, totalTime, productId } = data.user
  if (totalPerson >= 5) {
    // 場地預約
    return moneyFormat(1500 * totalTime)
  } else if (productId && productList.value[productId]) {
    // 已選定品項
    return moneyFormat(productList.value[productId].price)
  } else {
    return '---' // 現場選擇
  }
}

function getTime(date: number): string {
  const timeStr = new Date(date).toLocaleString('zh-TW', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  return timeStr
}
</script>

<style lang="scss" scoped>
.hideDel {
  visibility: hidden;
}
.checkList {
  overflow-y: auto;
  min-height: 400px;
  max-height: 530px;
  .sortable-ghost {
    display: none !important;
  }
}
</style>
