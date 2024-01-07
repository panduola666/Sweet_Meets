<template>
  <div class="p-7">
    <VeeForm @submit="schemaSubmit" :validation-schema="schema">
      <div class="row mb-3">
        <div class="col-12 col-lg">
          <ProductCard class="mb-3 d-lg-none" />
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
          <div class="mb-3">
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
          <div class="mb-3">
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
          <ProductCard class="mb-3 d-none d-lg-block" />
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
const form = reactive({
  name: '',
  phone: '',
  product: '',
  birth: '',
  order: ''
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
watch(() => date.orderHour, () => form.order = `${timeFormat(date.orderDate)}  ${date.orderHour}:${date.orderMin}`)
watch(() => date.orderMin, () => form.order = `${timeFormat(date.orderDate)}  ${date.orderHour}:${date.orderMin}`)

function timeFormat(date: string):string {
  return new Date(new Date(date).valueOf()).toLocaleDateString()
}

// 表單處理
const schema = {
  姓名: 'required',
  聯繫方式: 'required',
  預約日期: 'required',
  生日: 'required',
};
const schemaSubmit = (value: any, { resetForm }: any) => {
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