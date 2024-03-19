<template>
  <div class="p-7">
    <VeeForm :validation-schema="schema" @submit="submit">
      <div class="row mb-3">
        <div class="col-12 col-lg">
          <div v-if="singleOrder" class="mb-3 d-lg-none">
            <ProductCard :product="form.user.productData" />
          </div>
          <!-- 姓名 -->
          <div class="mb-3">
            <label for="name" class="form-label fw-bold required">{{
              $t('order.userName')
            }}</label>
            <VeeField
              id="name"
              v-model.trim="form.user.name"
              class="form-control"
              :name="$t('order.userName')"
              type="text"
              :placeholder="$t('placeholder.userName')"
            />
            <VeeErrorMessage :name="$t('order.userName')" class="text-danger" />
          </div>

          <!-- 聯繫方式 -->
          <div class="mb-3">
            <div class="row">
              <div class="col">
                <label for="phone" class="form-label fw-bold required">{{
                  $t('order.phone')
                }}</label>
                <VeeField
                  id="phone"
                  v-model.trim="form.user.tel"
                  v-number
                  class="form-control"
                  :name="$t('order.phone')"
                  type="tel"
                  :placeholder="$t('placeholder.userTel')"
                />
                <VeeErrorMessage
                  :name="$t('order.phone')"
                  class="text-danger"
                />
              </div>
              <div class="col">
                <label for="email" class="form-label fw-bold required">{{
                  $t('order.mail')
                }}</label>
                <VeeField
                  id="email"
                  v-model.trim="form.user.email"
                  class="form-control"
                  :name="$t('order.mail')"
                  type="email"
                  :placeholder="$t('placeholder.userMail')"
                />
                <VeeErrorMessage :name="$t('order.mail')" class="text-danger" />
              </div>
            </div>
          </div>

          <!-- 甜點品項 -->
          <div v-if="singleOrder" class="mb-3">
            <label for="product" class="form-label fw-bold">{{
              $t('product.productItem')
            }}</label>
            <VeeField
              id="product"
              v-model="form.user.productId"
              class="form-select"
              :name="$t('order.orderItem')"
              as="select"
              :placeholder="$t('placeholder.orderItem')"
            >
              <option value="">{{ $t('product.inStore') }}</option>
              <option
                v-for="option in productList"
                :key="option.id"
                :value="option.id"
              >
                {{ option.title }} - {{ moneyFormat(option.price) }}
              </option>
            </VeeField>
          </div>

          <!-- 人數 -->
          <div v-if="!singleOrder" class="mb-3">
            <label for="totalPerson" class="form-label fw-bold">{{
              $t('order.totalNum')
            }}</label>
            <VeeField
              id="totalPerson"
              v-model="form.user.totalPerson"
              class="form-select"
              :name="$t('order.totalNum')"
              as="select"
              :placeholder="$t('placeholder.totalNum')"
            >
              <option
                v-for="num in [5, 6, 7, 8, 9, 10]"
                :key="num"
                :value="num"
              >
                {{ num }} {{ $t('common.person') }}
              </option>
            </VeeField>
          </div>

          <!-- 預約時數 -->
          <div v-if="!singleOrder" class="mb-3">
            <label for="totalTime" class="form-label fw-bold">{{
              $t('order.totalTime')
            }}</label>
            <VeeField
              id="totalTime"
              v-model="form.user.totalTime"
              class="form-select"
              :name="$t('order.totalTime')"
              as="select"
              :placeholder="$t('placeholder.totalTime')"
            >
              <option
                v-for="hour in [1, 1.5, 2, 2.5, 3]"
                :key="hour"
                :value="hour"
              >
                {{ hour }} {{ $t('common.hour') }}
              </option>
            </VeeField>
          </div>
          <!-- 預約日期 -->
          <div class="mb-3">
            <VDatePicker
              v-model="date.orderDate"
              trim-weeks
              :input-debounce="500"
              :disabled-dates="disabledDates"
              :max-date="maxDate"
            >
              <template #default="{ togglePopover }">
                <label for="date" class="form-label fw-bold required">{{
                  $t('order.date')
                }}</label>
                <VeeField
                  id="date"
                  v-model="form.user.orderDate"
                  class="form-control mb-1"
                  :name="$t('order.date')"
                  type="text"
                  inputmode="numeric"
                  :placeholder="$t('placeholder.orderDate')"
                  readonly
                  @click="togglePopover"
                />
              </template>
            </VDatePicker>
            <div class="d-flex align-items-center gap-3">
              <select v-model="date.orderHour" class="form-select">
                <option v-for="i in 10" :key="i" :value="i + 11">
                  {{ i + 11 }}
                </option>
              </select>
              {{ $t('common.hourStr') }}
              <select v-model="date.orderMin" class="form-select">
                <option v-for="i in ['00', '30']" :key="i" :value="i">
                  {{ i }}
                </option>
              </select>
              {{ $t('common.minStr') }}
            </div>
            <VeeErrorMessage :name="$t('order.date')" class="text-danger" />
          </div>

          <!-- 生日 -->
          <div v-if="singleOrder" class="mb-3">
            <VDatePicker
              v-model="date.birthDate"
              trim-weeks
              :input-debounce="500"
              :max-date="new Date()"
            >
              <template #default="{ togglePopover }">
                <label for="birth" class="form-label fw-bold required">{{
                  $t('order.userBirth')
                }}</label>
                <VeeField
                  id="birth"
                  v-model.trim="form.user.birth"
                  class="form-control"
                  :name="$t('order.userBirth')"
                  type="text"
                  inputmode="numeric"
                  :placeholder="$t('placeholder.userBirth')"
                  readonly
                  @click="togglePopover"
                />
              </template>
            </VDatePicker>
            <VeeErrorMessage
              :name="$t('order.userBirth')"
              class="text-danger"
            />
          </div>
        </div>

        <div class="col-12 col-lg">
          <div v-if="singleOrder" class="mb-3 d-none d-lg-block">
            <ProductCard :product="form.user.productData" />
          </div>
          <div v-else class="mb-3">
            <label for="remark" class="form-label fw-bold">{{
              $t('order.userRemark')
            }}</label>
            <VeeField
              id="remark"
              v-model.trim="form.message"
              class="form-control"
              :name="$t('order.userRemark')"
              as="textarea"
              :placeholder="$t('placeholder.userRemark')"
              style="resize: none; height: 140px"
            />
          </div>

          <VDatePicker
            expanded
            trim-weeks
            :attributes="[{ highlight: true, dates: date.orderDate }]"
            :disabled-dates="disabledDates"
            :max-date="maxDate"
            style="pointer-events: none"
          >
            <template #footer>
              <p class="text-center" :class="{ hidden: !form.user.orderDate }">
                {{ $t('order.date') }}: {{ form.user.orderDate }}
              </p>
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
          {{ $t('common.cancel') }}
        </button>
        <button type="submit" class="btn btn-secondary fs-5 px-6">
          {{ $t('common.confirm') }}
        </button>
      </div>
    </VeeForm>
  </div>
</template>

<script setup lang="ts">
import type { cartsList } from '@/interface/cart'
import type { adminPost } from '@/interface/product'
import type { postOrder } from '@/interface/order'

import Products from '@/store/products'
import Carts from '@/store/cart'
import Order from '@/store/order'

interface propsType {
  currStep: number
}
const props = defineProps<propsType>()
const singleOrder: boolean = ['order'].includes(useRoute().name as string)
const productStore = Products()
const cartStore = Carts()
const orderStore = Order()

const isEditCart = ref<boolean>(false) // 是否有更換品項
const joinActivity = ref<boolean>(false) // 是否從參加活動

const form = ref<postOrder>({
  user: {
    name: '',
    email: '',
    tel: '',
    address: i18nT('order.local'),
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
      saveMode: 0,
    },
    productId: '',
    orderDate: '',
    totalPerson: 1, // 人數
    totalTime: 0, // 預約時數
  },
  message: '',
})

const carts: ComputedRef<cartsList[]> = computed(() => cartStore.carts || [])
const productList: ComputedRef<adminPost[]> = computed(
  () => productStore.products || [],
)

onMounted(() => {
  const timer = useRoute().query.timer
  nextTick(async () => {
    await productStore.productsGet()

    if (timer) {
      // 判斷活動預約時間代入
      date.orderDate = new Date(Number(timer))
    }
    joinActivity.value = !!timer

    if (joinActivity.value || !singleOrder) {
      // 活動預約 or 場地租借 => 因 API 限制須至少購物車有東西
      await cartStore.addCart({
        product_id: productList.value[0].id as string,
        qty: 1,
      })
    }

    if (singleOrder) {
      // 單人預約
      await cartStore.checkCart()
      if (!carts.value.length) {
        const swal = await useSwal({
          title: i18nT('error.emptyCart'),
          confirmButtonText: i18nT('error.goSelect'),
          confirmButtonColor: '#603D3D',
          allowOutsideClick: false,
        })
        if (swal.isConfirmed) {
          useRouter().push('/diy')
        }
        return
      }
      form.value.user.productId = carts.value[0].product_id
    } else if (orderStore.placeOrder.user.name) {
      // 判斷場地租借修改資料
      form.value = orderStore.placeOrder
    } else {
      // 場地租借初始值
      form.value.user.totalPerson = 5
      form.value.user.totalTime = 1
    }
  })
})

watch(
  () => form.value.user.productId,
  (productId) => {
    isEditCart.value = true
    if (productId) {
      const productData = productList.value.find(
        (item) => item.id === form.value.user.productId,
      )
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
        saveMode: 0,
      }
      form.value.user.totalTime = 0
    }
  },
)

async function submit() {
  if (isEditCart.value && form.value.user.productId) {
    // 需更換購物車內容
    await cartStore.clearCart()
    await cartStore.addCart({
      product_id: form.value.user.productId,
      qty: 1,
    })
  }
  if (singleOrder) {
    await orderStore.createOrder(form.value)
  } else {
    orderStore.placeOrder = form.value
  }

  changeStep(1)
}

// 日期設定
const date = reactive({
  birthDate: '',
  orderDate: '' as Date | string,
  orderHour: '12',
  orderMin: '00',
})

const disabledDates = ref([{ start: null, end: new Date() }])
const maxDate = ref(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
watch(
  () => date.birthDate,
  (value) => (form.value.user.birth = timeFormat(value)),
)
watch(
  () => date.orderDate,
  () =>
    (form.value.user.orderDate = `${timeFormat(date.orderDate as string)}  ${date.orderHour}:${date.orderMin}`),
)
watch(
  () => date.orderHour,
  () =>
    (form.value.user.orderDate = date.orderDate
      ? `${timeFormat(date.orderDate as string)}  ${date.orderHour}:${date.orderMin}`
      : ''),
)
watch(
  () => date.orderMin,
  () =>
    (form.value.user.orderDate = date.orderDate
      ? `${timeFormat(date.orderDate as string)}  ${date.orderHour}:${date.orderMin}`
      : ''),
)

function timeFormat(date: string): string {
  return new Date(new Date(date).getTime()).toLocaleDateString()
}

// 表單處理
const schema = computed(() => ({
  [i18nT('order.userName')]: 'required',
  [i18nT('order.phone')]: 'required|min:8',
  [i18nT('order.mail')]: 'required|email',
  [i18nT('order.date')]: 'required',
  [i18nT('order.userBirth')]: singleOrder ? 'required' : '',
}))

// 換頁
const emit = defineEmits(['click'])
function changeStep(page: number) {
  emit('click', props.currStep + Number(page))
}
</script>

<style lang="scss" scoped>
.hidden {
  visibility: hidden;
}
</style>
