<template>
  <div>
    <NuxtLayout name="back">
      <h1 class="h4 fw-bold mb-5">
        {{ route.params.id === '0' ? $t('product.add') : $t('product.edit') }}
      </h1>
      <VeeForm :validation-schema="schema" @submit="submit">
        <div class="row mb-3">
          <div class="col-lg-4">
            <!-- 產品圖片 -->
            <div class="mb-3">
              <label for="productImg" class="form-label fw-bold">{{
                $t('product.image')
              }}</label>
              <VeeField
                id="productImg"
                v-model.trim="form.imageUrl"
                class="form-control"
                :name="$t('product.image')"
                type="text"
                :placeholder="$t('placeholder.imageURL')"
              />
              <VeeErrorMessage
                :name="$t('product.image')"
                class="text-danger"
              />
            </div>
            <img :src="form.imageUrl" :alt="form.title" class="imageUrl mb-3" />
            <div class="position-relative mb-3">
              <label
                for="update"
                class="form-label position-relative z-1 btn btn-secondary w-100 fs-5"
                >{{ $t('common.uploadImg') }}</label
              >
              <input
                id="update"
                class="form-control position-absolute opacity-0 top-0 start-0"
                type="file"
                @change="uploadImage('imageUrl', $event)"
              />
            </div>
          </div>

          <div class="col">
            <div class="mb-3">
              <label for="productTitle" class="form-label fw-bold">{{
                $t('product.title')
              }}</label>
              <VeeField
                id="productTitle"
                v-model.trim="form.title"
                class="form-control"
                :name="$t('product.title')"
                type="text"
                :placeholder="$t('placeholder.productTitle')"
              />
              <VeeErrorMessage
                :name="$t('product.title')"
                class="text-danger"
              />
            </div>

            <div class="row row-cols-3 mb-3">
              <div class="col">
                <label for="description" class="form-label">{{
                  $t('product.category')
                }}</label>
                <select
                  id="description"
                  v-model="form.category"
                  class="form-select"
                >
                  <option value="" selected disabled hidden>
                    {{ $t('placeholder.selectCategory') }}
                  </option>
                  <option
                    v-for="item in productStore.categoryList"
                    :key="item"
                    :value="item"
                  >
                    {{ item }}
                  </option>
                </select>
              </div>

              <div class="col">
                <label for="description" class="form-label">{{
                  $t('product.finalTime')
                }}</label>
                <select
                  id="description"
                  v-model="form.finalTime"
                  class="form-select"
                >
                  <option
                    v-for="hour in [1, 1.5, 2, 2.5, 3]"
                    :key="hour"
                    :value="hour"
                  >
                    {{ hour }} {{ $t('common.hour') }}
                  </option>
                </select>
              </div>

              <div class="col">
                <label for="price" class="form-label fw-bold">{{
                  $t('product.price')
                }}</label>
                <VeeField
                  id="price"
                  v-model.number="form.origin_price"
                  v-number
                  class="form-control"
                  :name="$t('product.price')"
                  type="text"
                  :placeholder="$t('placeholder.productPrice')"
                />
                <VeeErrorMessage
                  :name="$t('product.price')"
                  class="text-danger"
                />
              </div>
            </div>

            <div class="mb-3">
              <p class="form-label fw-bold">{{ $t('product.feature') }}</p>
              <ul>
                <li
                  v-for="(item, index) in form.content"
                  :key="index"
                  class="row align-items-center"
                >
                  <div class="col-9 col-lg-10">
                    <VeeField
                      v-model.trim="form.content[index]"
                      class="form-control mb-2"
                      :name="`${$t('product.feature')}${index}`"
                      type="text"
                    />
                  </div>
                  <div
                    class="col d-flex align-items-center gap-2 gap-lg-5 fs-4"
                  >
                    <NuxtIcon
                      v-if="index < 4 && index === form.content.length - 1"
                      name="add"
                      class="pointer"
                      @click="add('content')"
                    />
                    <NuxtIcon
                      v-if="index !== 0"
                      name="delete"
                      class="pointer"
                      @click="del('content', index)"
                    />
                  </div>
                </li>
              </ul>
              <VeeErrorMessage
                :name="$t('product.feature') + '0'"
                class="text-danger"
              />
            </div>

            <div class="mb-3">
              <p class="form-label fw-bold">{{ $t('product.saveMethod') }}</p>
              <div class="d-flex gap-5 mb-3">
                <div
                  v-for="(item, index) in saveModeList"
                  :key="item"
                  class="form-check"
                >
                  <input
                    :id="`mode${index}`"
                    v-model="form.saveMode"
                    class="form-check-input"
                    type="radio"
                    name="saveMethods"
                    :checked="form.saveMode === index"
                    :value="index"
                  />
                  <label
                    class="form-check-label fw-bold pointer"
                    :for="`mode${index}`"
                  >
                    {{ item }}
                  </label>
                </div>
              </div>
              <ul>
                <li
                  v-for="(item, index) in form.saveMethods"
                  :key="index"
                  class="row align-items-center"
                >
                  <div class="col-9 col-lg-10">
                    <VeeField
                      v-model.trim="form.saveMethods[index]"
                      class="form-control mb-2"
                      :name="`${$t('product.saveMethod')}${index}`"
                      type="text"
                      :readonly="!form.saveMode"
                    />
                  </div>
                  <div
                    v-if="form.saveMode"
                    class="col d-flex align-items-center gap-2 gap-lg-5 fs-4"
                  >
                    <NuxtIcon
                      v-if="index < 4 && index === form.saveMethods.length - 1"
                      name="add"
                      class="pointer"
                      @click="add('saveMethods')"
                    />
                    <NuxtIcon
                      v-if="index !== 0"
                      name="delete"
                      class="pointer"
                      @click="del('saveMethods', index)"
                    />
                  </div>
                </li>
              </ul>
              <VeeErrorMessage
                :name="`${$t('product.saveMethod')}0`"
                class="text-danger"
              />
            </div>
          </div>
        </div>

        <div class="d-flex align-items-center gap-3">
          <p class="fw-bold">{{ $t('common.moreImg') }}</p>
          <div v-if="form.imagesUrl.length < 5" class="position-relative mb-3">
            <label
              for="updateMore"
              class="form-label position-relative z-1 btn btn-outline-secondary px-5"
              >{{ $t('common.uploadImg') }}</label
            >
            <input
              id="updateMore"
              class="form-control position-absolute opacity-0 top-0 start-0"
              type="file"
              name=""
              @change="uploadImage('imagesUrl', $event)"
            />
          </div>
        </div>
        <div class="row row-cols-2 row-cols-lg-5 g-3">
          <div
            v-for="(imgUrl, index) in form.imagesUrl"
            :key="index"
            class="col position-relative"
          >
            <button
              type="button"
              class="btn btn-close position-absolute top-5 end-5 bg-white p-2 rounded-circle"
              @click="form.imagesUrl.splice(index, 1)"
            ></button>
            <img
              :src="imgUrl"
              :alt="imgUrl"
              class="object-fit-cover w-100"
              height="150"
            />
          </div>
        </div>

        <div class="d-flex justify-content-end gap-3 my-6">
          <nuxt-link to="/admin/products" class="btn btn-lg btn-primary">
            {{ $t('common.cancel') }}
          </nuxt-link>
          <button type="submit" class="btn btn-lg btn-secondary">
            {{ $t('common.confirm') }}
          </button>
        </div>
      </VeeForm>
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import Products from '@/store/products'
import type { adminPost } from '@/interface/product'

const route = useRoute()
// const saveMode = ref<number>(0);
const saveModeList: ComputedRef<string[]> = computed(() => [
  i18nT('product.commonMode'),
  i18nT('product.selfMode'),
])
const productStore = Products()

const schema = computed(() => ({
  [i18nT('product.title')]: 'required',
  [i18nT('product.image')]: 'required',
  [i18nT('product.price')]: 'required|min_value:100|integer',
  [`${i18nT('product.feature')}0`]: (val: string) => {
    return !!val || i18nT('error.required', [i18nT('product.feature')])
  },
  [`${i18nT('product.saveMethod')}0`]: (val: string) => {
    return !!val || i18nT('error.required', [i18nT('product.saveMethod')])
  },
}))
const form = ref<adminPost>({
  title: '',
  category: '',
  origin_price: 100,
  price: 100,
  unit: '人',
  description: '',
  finalTime: 1,
  content: [''],
  saveMethods: [],
  imageUrl: '',
  imagesUrl: [],
  is_enabled: 1,
  saveMode: 0,
})

const tempSaveMethods = ref<string[]>([])

onMounted(() => {
  nextTick(() => {
    if (route.params.id !== '0') {
      // 修改
      productStore.adminProductGet()
      const { imagesUrl = [], saveMode = 0 } = productStore.product as adminPost

      if (saveMode) {
        // 使用自定義保存方式(資料緩存)
        tempSaveMethods.value = productStore.product.saveMethods
      }
      form.value = {
        ...productStore.product,
        imagesUrl,
      } as adminPost
    }
  })
})
watch(
  () => form.value.saveMode,
  (saveMode) => {
    form.value.saveMethods = saveMode
      ? tempSaveMethods.value.length
        ? tempSaveMethods.value
        : ['']
      : [
          i18nT('product.commonContent1'),
          i18nT('product.commonContent2'),
          i18nT('product.commonContent3'),
          i18nT('product.commonContent4'),
        ]
  },
)

function add(key: 'content' | 'saveMethods') {
  if (Object.keys(form.value).includes(key)) {
    form.value[key].push('')
  }
}
function del(key: 'content' | 'saveMethods', index: number) {
  if (Object.keys(form.value).includes(key)) {
    form.value[key].splice(index, 1)
  }
}

// 上傳圖片
async function uploadImage(formKey: 'imageUrl' | 'imagesUrl', e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (!files) return
  const imgUrl = await upload(files)
  if (typeof form.value[formKey] === 'string') {
    form.value[formKey] = imgUrl
  } else if (Array.isArray(form.value[formKey])) {
    ;(form.value[formKey] as string[]).push(imgUrl)
  }
}

// 送出表單
async function submit() {
  form.value.price = form.value.origin_price
  form.value.description = `${i18nT('product.finalTime')}: ${form.value.finalTime} h`
  if (route.params.id !== '0' && form.value.id) {
    await productStore.adminPUT(form.value.id, form.value)
  } else {
    await productStore.adminAdd(form.value)
  }
  tempSaveMethods.value = []
  useRouter().push('/admin/products')
}
</script>
<style lang="scss" scoped>
.imageUrl {
  max-height: 300px;
  width: 100%;
  object-fit: cover;
}
</style>
