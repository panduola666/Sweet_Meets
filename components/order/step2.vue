<template>
  <div class="p-7">
    <VeeForm @submit="submit" :validation-schema="schema">
      <div class="row mb-3">
        <div class="col-12 col-lg">
          <ProductCard v-if="singleOrder" class="mb-3 d-lg-none" />
          <!-- 姓名 -->
          <div class="mb-3">
            <label for="name" class="form-label fw-bold">姓名</label>
            <VeeField
              class="form-control"
              id="name"
              name="姓名"
              type="text"
              placeholder="請輸入姓名"
              v-model="form.name"
            />
            <VeeErrorMessage name="姓名" class="text-danger" />
          </div>

          <!-- 聯繫方式 -->
          <div class="mb-3">
            <label for="phone" class="form-label fw-bold">聯繫方式</label>
            <VeeField
              class="form-control"
              id="phone"
              name="聯繫方式"
              type="text"
              inputmode="tel"
              placeholder="請輸入聯繫方式"
              v-model="form.phone"
            />
            <VeeErrorMessage name="聯繫方式" class="text-danger" />
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
              v-model="form.product"
            >
              <option value="">到店選擇</option>
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
              v-model="form.totalPerson"
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
              v-model="form.totalTime"
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
            >
              <template #default="{ togglePopover }">
                <label for="date" class="form-label fw-bold">預約日期</label>
                <VeeField
                  v-model="form.order"
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
            <VDatePicker trim-weeks v-model="date.birthDate" :input-debounce="500">
              <template #default="{ togglePopover }">
                <label for="birth" class="form-label fw-bold">生日</label>
                <VeeField
                  v-model="form.birth"
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
          <ProductCard v-if="singleOrder" class="mb-3 d-none d-lg-block" />
          <div v-else class="mb-3">
            <label for="remark" class="form-label fw-bold">備註</label>
            <VeeField
                class="form-control"
                id="remark"
                name="備註"
                as="textarea"
                placeholder="請輸入備註"
                v-model="form.remark"
                style="resize: none;height: 140px;"
              />
          </div>

          <VDatePicker
            expanded
            trim-weeks
            :attributes="[{highlight: true,dates: date.orderDate}]"
            :disabled-dates="disabledDates"
            style="pointer-events: none"
          >
            <template #footer>
              <p class="text-center" :class="{hidden: !form.order}">預約日期: {{ form.order }}</p>
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
const props = defineProps(['currStep']);
const singleOrder: boolean = ['order'].includes(useRoute().name as string)

const form = reactive({
  name: '',
  phone: '',
  product: '',
  birth: '',
  order: '',
  remark: '',
  totalPerson: 5,
  totalTime: 1
})


// 日期設定
const date = reactive({
  birthDate: '',
  orderDate: '',
  orderHour: '12',
  orderMin: '00'
})
const disabledDates = ref([{ start: null, end: new Date() }]);
watch(() => date.birthDate, (value) => form.birth = timeFormat(value))
watch(() => date.orderDate, () => form.order = `${timeFormat(date.orderDate)}  ${date.orderHour}:${date.orderMin}`)
watch(() => date.orderHour, () => form.order = date.orderDate ? `${timeFormat(date.orderDate)}  ${date.orderHour}:${date.orderMin}` : '')
watch(() => date.orderMin, () => form.order = date.orderDate ? `${timeFormat(date.orderDate)}  ${date.orderHour}:${date.orderMin}` : '')

function timeFormat(date: string):string {
  return new Date(new Date(date).valueOf()).toLocaleDateString()
}

// 表單處理
const schema = {
  姓名: 'required',
  聯繫方式: 'required',
  預約日期: 'required',
  生日: singleOrder ? 'required' : '',
};
const submit = (value: any, { resetForm }: any) => {
  console.log(value);
  
  changeStep(1);
  resetForm();
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