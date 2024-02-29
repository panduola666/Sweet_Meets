<template>
  <div>
    <NuxtLayout name="back">
      <div class="row">
        <div class="col-12 col-lg-9">
          <div class="d-flex align-items-center justify-content-end gap-3 mb-3">
            <button type="button" class="btn btn-outline-secondary" :class="{disabled: !currOrder.id}" @click="deleteOrder">
              取消預約
            </button>
            <button type="button" class="btn btn-secondary" :class="{disabled: !currOrder.id}">報到</button>
          </div>
          <div class="table-responsive">
            <table class="table table-bordered align-middle text-center table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">姓名</th>
                  <th scope="col">時間</th>
                  <th scope="col">電話</th>
                  <th scope="col">品項</th>
                  <th scope="col">費用</th>
                </tr>
              </thead>
              <tbody class="fs-lg-5">
                <tr v-for="(order, index) in orders" :key="order.id" @click="currOrder = order" :class="{'table-active': currOrder.id === order.id}">
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
                  <td class="text-nowrap">{{ order.user.orderDate }}</td>
                  <td class="text-nowrap">{{ order.user.tel }}</td>
                  <td class="text-nowrap">
                    <span v-if="getItem(order)">{{ getItem(order) }}</span>
                    <select class="form-select" v-model="order.user.productId" v-else>
                      <option value="">請選擇品項</option>
                      <option :value="option.id" v-for="option in productList" :key="option.id">{{ option.title }} - {{ moneyFormat(option.price) }}</option>
                    </select>
                  </td>
                  <td class="text-nowrap">{{ getMoney(order) }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="mt-3 mb-6">
            <Pagination :pagination="orderStore.pagination" @click="getDate" />
          </div>
        </div>
        <div class="col bg-primary bg-opacity-50 py-5">
          <p class="d-flex justify-content-between fw-bold">
            <span>報到名單</span>
            <span>離場</span>
          </p>
          <ul class="mb-5 checkList px-3">
            <li class="d-flex align-items-center gap-3 mb-5" v-for="i in 5">
              <div class="bg-white rounded-3 flex-grow-1">
                <label
                  class="form-check-label d-flex flex-column fs-5 p-3"
                  for="check1"
                >
                  <p
                    class="mb-0 d-flex align-items-center justify-content-between"
                  >
                    <span class="fw-bold">張三</span>
                    <small class="fs-6">18:05</small>
                  </p>
                  <p class="fw-bold mb-4">焦糖布丁塔</p>
                  <p
                    class="mb-0 d-flex align-items-center justify-content-between"
                  >
                    <small class="fs-6">(未付款)</small>
                    <span class="fw-bold">$180</span>
                  </p>
                </label>
                <button type="button" class="btn btn-secondary w-100 rounded-0">
                  付款
                </button>
              </div>
              <input
                class="form-check-input p-2"
                type="checkbox"
                value=""
                id="check1"
              />
            </li>
          </ul>

          <!-- <nav>
            <ul class="pagination align-items-center justify-content-center">
              <li class="page-item" :class="{ disabled: false }">
                <button class="page-link">&lt;</button>
              </li>
              <li class="p-3 fw-bold">1</li>
              <li class="page-item" :class="{ disabled: true }">
                <button class="page-link">&gt;</button>
              </li>
            </ul>
          </nav> -->
        </div>
      </div>

      <!-- 備註 Modal -->
      <div
        class="modal fade"
        id="remark"
        tabindex="-1"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header py-2">
              <h1 class="modal-title fs-5">備註</h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body fw-bold fs-5" style="min-height: 100px;">{{ remark }}</div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import type { adminPost } from '@/interface/product';
import type { orderAdminData } from '@/interface/order';
import Order from '@/store/order'
import Products from '@/store/products'

const orderStore = Order()
const productStore = Products()

const orders: ComputedRef<orderAdminData[]> = computed(() => orderStore.orders)
const remark = ref<string>('')
const productList: ComputedRef<adminPost[]> = computed(() => productStore.products || [])
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
  }
}) // 暫存的訂單資料

onMounted(() => {
  nextTick(async() => {
    await productStore.adminGetAll()
    getDate(1)
    console.log(orders.value);
  })
})

function getDate (page: string|number) {
  orderStore.adminGet(page)
}

async function deleteOrder() {
  const swal = await useSwal({
    title: `確定刪除此預約訂單嗎?`,
    showCancelButton: true,
    allowOutsideClick: false
  })
  if(swal.isConfirmed) {
    await orderStore.adminDel(currOrder.value.id)
    getDate(orderStore.pagination.current_page)
  }
}

// 取得訂單品項
function getItem(data: orderAdminData) {
  const { totalPerson, totalTime, productId, productData } = data.user
  if (totalPerson >= 5) { // 場地預約
    return `場地預約 - ${totalPerson}人(${totalTime} 小時)`
  } else if (productId) { // 已選定品項
    return productData.title
  } else {
    return '' // 現場選擇
  }
}

// 取得訂單金額
function getMoney(data: orderAdminData) {
  const { totalPerson, totalTime, productId } = data.user
  if (totalPerson >= 5) { // 場地預約
    return moneyFormat(1500 * totalTime)
  } else if (productId) { // 已選定品項
    return moneyFormat(data.total)
  } else {
    return '---' // 現場選擇
  }
}
</script>

<style lang="scss" scoped>
.checkList{
  overflow-y: auto;
  max-height: 450px;
}
</style>