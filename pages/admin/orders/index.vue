<template>
  <div>
    <NuxtLayout name="back">
      <div class="row">
        <div class="col-12 col-lg-9">
          <div class="d-flex align-items-center justify-content-end gap-3 mb-3">
            <button
              type="button"
              class="btn btn-outline-secondary"
              :class="{ disabled: !currOrder.id }"
              @click="deleteOrder"
            >
              取消預約
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              :class="{ disabled: !currOrder.id || !currOrder.user.productId }"
              @click="checkIn"
            >
              報到
            </button>
          </div>
          <div class="table-responsive">
            <table
              class="table table-bordered align-middle text-center table-hover"
            >
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
                <tr
                  v-for="(order, index) in orders"
                  :key="order.id"
                  @click="currOrder = order"
                  :class="{ 'table-active': currOrder.id === order.id }"
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
                  <td class="text-nowrap" :class="{'text-danger text-decoration-line-through': new Date(order.user.orderDate).getTime() < (new Date().getTime() + 10 * 60 * 1000)}">{{ order.user.orderDate }}</td>
                  <td class="text-nowrap">{{ order.user.tel }}</td>
                  <td class="text-nowrap">
                    <span v-if="getItem(order)">{{ getItem(order) }}</span>
                    <select
                      class="form-select"
                      v-model="order.user.productId"
                      v-else
                    >
                      <option value="">請選擇品項</option>
                      <option
                        :value="option.id"
                        v-for="option in productList"
                        :key="option.id"
                      >
                        {{ option.title }} - {{ moneyFormat(option.price) }}
                      </option>
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
            <li
              class="d-flex align-items-center gap-3 mb-5"
              v-for="item in checkInList"
              :key="item.id"
            >
              <div class="bg-white rounded-3 flex-grow-1">
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
                        ? `場地預約 - ${item.totalPerson}人`
                        : item.title
                    }}
                  </p>
                  <p class="fs-6 mb-0" v-if="item.totalPerson >= 5">
                    預計離場: {{ getTime(item.final_date) }}
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
                      >{{ item.is_paid ? `(已付款)` : `(未付款)` }}</small
                    >
                    <span class="fw-bold">{{ item.total }}</span>
                  </p>
                </div>
                <button
                  type="button"
                  class="btn btn-secondary w-100 rounded-0"
                  v-if="!item.is_paid"
                  @click="openPaidModal(item)"
                >
                  付款
                </button>
              </div>
              <NuxtIcon name="delete" class="pointer" @click="checkLeave(item)" />
            </li>
          </ul>
          <Pagination
            :pagination="couponStore.pagination"
            :hideStr="true"
            @click="getCheckIn"
          />
        </div>
      </div>

      <!-- 備註 Modal -->
      <div class="modal fade" id="remark" tabindex="-1" aria-hidden="true">
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
            <div class="modal-body fw-bold fs-5" style="min-height: 100px">
              {{ remark }}
            </div>
          </div>
        </div>
      </div>

      <!-- 付款 Modal -->
      <div class="modal fade" tabindex="-1" ref="paidModal">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5">付款確認</h1>
              <button
                type="button"
                class="btn-close"
                @click="closePaidModal"
              ></button>
            </div>
            <div class="modal-body">
              <p><span class="fw-bold me-3">姓名:</span> {{ modalData.name }}</p>
              <div class="mb-3 d-flex align-items-center">
                <label for="finalProduct" class="form-label fw-bold flex-shrink-0 me-3">品項:</label>
                <select
                  class="form-select"
                  id="finalProduct"
                  v-model="modalData.productId"
                >
                  <option
                    :value="option.id"
                    v-for="option in productList"
                    :key="option.id"
                  >
                    {{ option.title }} - {{ moneyFormat(option.price) }}
                  </option>
                </select>
              </div>
              <p class="d-flex justify-content-between">
                <span>費用:</span>
                <span class="fs-3 fw-bold">{{ getFinalPaid(modalData) }}</span>
              </p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                @click="closePaidModal"
              >
                再想想
              </button>
              <button type="button" class="btn btn-secondary" @click="paidNow(modalData)">
                確認並付款
              </button>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import type { couponData } from '@/interface/coupon';
import type { orderAdminData } from '@/interface/order';
import Order from '@/store/order';
import Products from '@/store/products';
import Coupon from '@/store/coupon';

const orderStore = Order();
const productStore = Products();
const couponStore = Coupon();

const { $bootstrap } = useNuxtApp();
const paidModal = ref(null);
let modal: any;
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
  percent: 0
});

const orders: ComputedRef<orderAdminData[]> = computed(() => orderStore.orders);
const remark = ref<string>('');
const productList: ComputedRef<{ [key: string]: any }> = computed(
  () => productStore.products || {}
);
const checkInList: ComputedRef<couponData[]> = computed(
  () => couponStore.coupons || []
);
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
}); // 暫存的訂單資料

onMounted(() => {
  nextTick(async () => {
    modal = $bootstrap.modal(paidModal.value);

    await productStore.adminGetAll();
    getDate(1);
    getCheckIn(1);
  });
});

function getDate(page: string | number) {
  orderStore.adminGet(page);
}
function getCheckIn(page: string | number) {
  couponStore.adminGet(page);
}

// 付款流程 start
function openPaidModal(item: couponData) {
  if (!modal) {
    modal = $bootstrap.modal(paidModal.value);
  }
  modalData.value = item;
  modal.show();
}
function closePaidModal() {
  modal.hide();
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
  getCheckIn(couponStore.pagination.current_page);
}
// 付款流程 end

// 離場
async function checkLeave(item: couponData) {
  const swal = await useSwal({
    title: `確定讓<span class="text-danger mx-3">${item.name}</span>離場嗎?`,
    showCancelButton: true,
    allowOutsideClick: false,
  });
  if(swal.isConfirmed && item.id) {
    await couponStore.adminLeave(item.id)
    getCheckIn(couponStore.pagination.current_page);
  }
}

// 取消預約
async function deleteOrder() {
  const swal = await useSwal({
    title: `確定刪除此預約訂單嗎?`,
    showCancelButton: true,
    allowOutsideClick: false,
  });
  if (swal.isConfirmed) {
    await orderStore.adminDel(currOrder.value.id);
    getDate(orderStore.pagination.current_page);
  }
}

// 預約報到
async function checkIn() {
  const { is_paid, id } = currOrder.value;
  const { name, totalPerson, totalTime, productId } = currOrder.value.user;

  const data: couponData = {
    name,
    productId,
    title: totalPerson >= 5 ? '場地預約' : productList.value[productId].title,
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
  };

  await couponStore.checkIn(data);
  await orderStore.adminCheck(id);
  getCheckIn(couponStore.pagination.current_page);
  getDate(orderStore.pagination.current_page);
}

// 取得訂單品項
function getItem(data: orderAdminData) {
  const { totalPerson, totalTime, productId, productData } = data.user;
  if (totalPerson >= 5) {
    // 場地預約
    return `場地預約 - ${totalPerson}人(${totalTime} 小時)`;
  } else if (productId) {
    // 已選定品項
    return productData.title;
  } else {
    return ''; // 現場選擇
  }
}

// 取得訂單金額
function getMoney(data: orderAdminData) {  
  if(!productList.value || !data) return moneyFormat(0)
  const { totalPerson, totalTime, productId } = data.user;
  if (totalPerson >= 5) {
    // 場地預約
    return moneyFormat(1500 * totalTime);
  } else if (productId && productList.value[productId]) {
    // 已選定品項
    return moneyFormat(productList.value[productId].price);
  } else {
    return '---'; // 現場選擇
  }
}

function getTime(date: number): string {
  const timeStr = new Date(date).toLocaleString('zh-TW', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  return timeStr;
}
</script>

<style lang="scss" scoped>
.checkList {
  overflow-y: auto;
  max-height: 530px;
}
</style>
