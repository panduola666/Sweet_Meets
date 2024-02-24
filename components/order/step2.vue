<template>
  <div class="p-7">
    <VeeForm @submit="submit" :validation-schema="schema">
      <div class="row mb-3">
        <div class="col-12 col-lg">
          <div v-if="singleOrder" class="mb-3 d-lg-none">
            <ProductCard :product="form.user.productData" />
          </div>
          <!-- 姓名 -->
          <div class="mb-3">
            <label for="name" class="form-label fw-bold">姓名</label>
            <VeeField
              v-trim
              class="form-control"
              id="name"
              name="姓名"
              type="text"
              placeholder="請輸入姓名"
              v-model.trim="form.user.name"
            />
            <VeeErrorMessage name="姓名" class="text-danger" />
          </div>

          <!-- 聯繫方式 -->
          <div class="mb-3">
            <div class="row">
              <div class="col">
                <label for="phone" class="form-label fw-bold">手機</label>
                <VeeField
                  v-number
                  class="form-control"
                  id="phone"
                  name="手機"
                  type="tel"
                  placeholder="請輸入手機號碼"
                  v-model.trim="form.user.tel"
                />
                <VeeErrorMessage name="手機" class="text-danger" />
              </div>
              <div class="col">
                <label for="email" class="form-label fw-bold">信箱</label>
                <VeeField
                  class="form-control"
                  id="email"
                  name="信箱"
                  type="email"
                  placeholder="請輸入信箱"
                  v-model.trim="form.user.email"
                />
                <VeeErrorMessage name="信箱" class="text-danger" />
              </div>
            </div>
          </div>

          <!-- 甜點品項 -->
          <div class="mb-3" v-if="singleOrder">
            <label for="product" class="form-label fw-bold">甜點品項</label>
            <VeeField
              class="form-select"
              id="product"
              name="品項"
              as="select"
              placeholder="請選擇品項"
              v-model="form.user.productId"
            >
              <option value="">到店選擇</option>
              <option :value="option.id" v-for="option in productList" :key="option.id">{{ option.title }} - {{ moneyFormat(option.price) }}</option>
            </VeeField>
          </div>

          <!-- 人數 -->
          <div class="mb-3" v-if="!singleOrder">
            <label for="totalPerson" class="form-label fw-bold">人數</label>
            <VeeField
              class="form-select"
              id="totalPerson"
              name="人數"
              as="select"
              placeholder="請選擇人數"
              v-model="form.user.totalPerson"
            >
              <option v-for="num in [5, 6, 7, 8, 9, 10]" :key="num" :value="num">{{num}} 人</option>
            </VeeField>
          </div>

          <!-- 預約時數 -->
          <div class="mb-3" v-if="!singleOrder">
            <label for="totalTime" class="form-label fw-bold">預約時數</label>
            <VeeField
              class="form-select"
              id="totalTime"
              name="預約時數"
              as="select"
              placeholder="請選擇預約時數"
              v-model="form.user.totalTime"
            >
              <option v-for="(hour, index) in [1, 1.5, 2, 2.5, 3]" :key="hour" :value="hour" >{{ hour }} 小時</option>
            </VeeField>
          </div>

          <!-- 預約日期 -->
          <div class="mb-3">
            <VDatePicker
              trim-weeks
              v-model="date.orderDate"
              :input-debounce="500"
              :disabled-dates="disabledDates"
              :max-date="maxDate"
            >
              <template #default="{ togglePopover }">
                <label for="date" class="form-label fw-bold">預約日期</label>
                <VeeField
                  v-model="form.user.orderDate"
                  @click="togglePopover"
                  class="form-control mb-1"
                  id="date"
                  name="預約日期"
                  type="text"
                  inputmode="numeric"
                  placeholder="請選擇預約日期"
                  readonly
                />
              </template>
            </VDatePicker>
            <div class="d-flex align-items-center gap-3">
              <select class="form-select" v-model="date.orderHour">
                <option :value="i + 11" v-for="i in 10" :key="i">{{ i + 11 }}</option>
            </select>
            點
            <select class="form-select" v-model="date.orderMin">
              <option :value="i" v-for="i in ['00', '30']" :key="i">{{i}}</option>
            </select>
            分
            </div>
            <VeeErrorMessage name="預約日期" class="text-danger" />
          </div>

          <!-- 生日 -->
          <div class="mb-3" v-if="singleOrder">
            <VDatePicker trim-weeks v-model="date.birthDate" :input-debounce="500" :max-date="new Date()">
              <template #default="{ togglePopover }">
                <label for="birth" class="form-label fw-bold">生日</label>
                <VeeField
                  v-model.trim="form.user.birth"
                  @click="togglePopover"
                  class="form-control"
                  id="birth"
                  name="生日"
                  type="text"
                  inputmode="numeric"
                  placeholder="請選擇生日"
                  readonly
                />
              </template>
            </VDatePicker>
            <VeeErrorMessage name="生日" class="text-danger" />
          </div>
        </div>

        <div class="col-12 col-lg">
          <div v-if="singleOrder" class="mb-3 d-none d-lg-block">
            <ProductCard :product="form.user.productData" />
          </div>
          <div v-else class="mb-3">
            <label for="remark" class="form-label fw-bold">備註</label>
            <VeeField
                class="form-control"
                id="remark"
                name="備註"
                as="textarea"
                placeholder="請輸入備註"
                v-model.trim="form.message"
                style="resize: none;height: 140px;"
              />
          </div>

          <VDatePicker
            expanded
            trim-weeks
            :attributes="[{highlight: true,dates: date.orderDate}]"
            :disabled-dates="disabledDates"
            :max-date="maxDate"
            style="pointer-events: none"
          >
            <template #footer>
              <p class="text-center" :class="{hidden: !form.user.orderDate}">預約日期: {{ form.user.orderDate }}</p>
            </template>
          </VDatePicker>
        </div>
      </div>
      <div class="d-flex justify-content-end gap-3">
        <button
          type="reset"
          class="btn btn-primary fs-5 px-6"
          @click="changeStep(-1)"
        >
          取消
        </button>
        <button type="submit" class="btn btn-secondary fs-5 px-6">確認</button>
      </div>
    </VeeForm>
  </div>
</template>
<script setup lang="ts">
import type { cartsList } from '@/interface/cart';
import type { adminPost } from '@/interface/product';
import type { postOrder } from '@/interface/order';

import Products from '@/store/products'
import Carts from '@/store/cart'
import Order from '@/store/order'

const props = defineProps(['currStep']);
const singleOrder: boolean = ['order'].includes(useRoute().name as string)
const productStore = Products();
const cartStore = Carts()
const orderStore = Order()

const isEditCart = ref<boolean>(false) // 是否有更換品項

const form = ref<postOrder>({
  user: {
   name: '',
    email: '',
    tel: '',
    address: '本店',
    birth: '',
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
      saveMode: 0
    },
    productId: '',
    orderDate: '',
    totalPerson: 1, // 人數
    totalTime: 0 // 預約時數
  },
  message: '',
})


const carts: ComputedRef<cartsList[]> = computed(() => cartStore.carts || [])
const productList: ComputedRef<adminPost[]> = computed(() => productStore.products || [])

onMounted(() => {
  nextTick(async () => {
    await productStore.productsGet()
    if (singleOrder) { // 單人預約
      await cartStore.checkCart()
      if (!carts.value.length) {
        const swal =  await useSwal({
          title: '暫無商品',
          confirmButtonText: '來去選購',
          confirmButtonColor: '#603D3D',
          allowOutsideClick: false
        });
        if (swal.isConfirmed) {
          useRouter().push('/diy')
        }
        return
      }
      form.value.user.productId = carts.value[0].product_id
    } else {
      form.value.user.totalPerson = 5
      form.value.user.totalTime = 1
    }
  })
})

watch(() => form.value.user.productId, (productId) => {
  isEditCart.value = true
  if (productId) {
    const productData = productList.value.find(item => item.id === form.value.user.productId)
    if (productData) {
      form.value.user.totalTime = productData.finalTime
      form.value.user.productData = productData
    }
  } else {
    form.value.user.productData = {
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
      saveMode: 0
    }
    form.value.user.totalTime = 0
  }
})

async function submit (value: any, { resetForm }: any) {
  if (isEditCart.value && form.value.user.productId) { // 需更換購物車內容
    await cartStore.clearCart()
    await cartStore.addCart({
      product_id: form.value.user.productId,
      qty: 1
    })
  }
  await orderStore.createOrder(form.value)
  
  changeStep(1);
  resetForm();
};

// 日期設定
const date = reactive({
  birthDate: '',
  orderDate: '',
  orderHour: '12',
  orderMin: '00'
})

const disabledDates = ref([{ start: null, end: new Date() }]);
const maxDate = ref(new Date().getTime() + (30 * 24 * 60 * 60 * 1000))
watch(() => date.birthDate, (value) => form.value.user.birth = timeFormat(value))
watch(() => date.orderDate, () => form.value.user.orderDate = `${timeFormat(date.orderDate)}  ${date.orderHour}:${date.orderMin}`)
watch(() => date.orderHour, () => form.value.user.orderDate = date.orderDate ? `${timeFormat(date.orderDate)}  ${date.orderHour}:${date.orderMin}` : '')
watch(() => date.orderMin, () => form.value.user.orderDate = date.orderDate ? `${timeFormat(date.orderDate)}  ${date.orderHour}:${date.orderMin}` : '')

function timeFormat(date: string):string {
  return new Date(new Date(date).getTime()).toLocaleDateString()
}

// 表單處理
const schema = {
  姓名: 'required',
  手機: 'required|min:8',
  信箱: 'required|email',
  預約日期: 'required',
  生日: singleOrder ? 'required' : '',
};

// 換頁
const emit = defineEmits(['click']);
function changeStep(page: number) {
  emit('click', props.currStep + Number(page));
}
</script>
<style lang="scss" scoped>
.hidden{
  visibility: hidden;
}
</style>