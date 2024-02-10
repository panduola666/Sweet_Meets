<template>
  <div>
    <NuxtLayout name="back">
      <h1 class="h4 fw-bold mb-5">
        {{ route.params.id === '0' ? '新增品項' : '修改品項' }}
      </h1>
      <VeeForm @submit="submit" :validation-schema="schema">
        <div class="row mb-3">
          <div class="col-lg-4">
            <!-- 產品圖片 -->
            <div class="mb-3">
              <label for="productImg" class="form-label fw-bold"
                >產品圖片</label
              >
              <VeeField
                class="form-control"
                id="productImg"
                name="產品圖片"
                type="text"
                placeholder="請輸入圖片網址"
                v-model="form.imageUrl"
              />
              <VeeErrorMessage name="產品圖片" class="text-danger" />
            </div>
            <img :src="form.imageUrl" :alt="form.title" class="imageUrl mb-3" />
            <div class="position-relative mb-3">
              <label
                for="update"
                class="form-label position-relative z-1 btn btn-secondary w-100 fs-5"
                >上傳圖片</label
              >
              <input
                class="form-control position-absolute opacity-0 top-0 start-0"
                type="file"
                id="update"
                @change="uploadImage('imageUrl', $event)"
              />
            </div>
          </div>

          <div class="col">
            <div class="mb-3">
              <label for="productTitle" class="form-label fw-bold"
                >產品名稱</label
              >
              <VeeField
                class="form-control"
                id="productTitle"
                name="產品名稱"
                type="text"
                placeholder="請輸入產品名稱"
                v-model="form.title"
              />
              <VeeErrorMessage name="產品名稱" class="text-danger" />
            </div>

            <div class="row row-cols-3 mb-3">
              <div class="col">
                <label for="description" class="form-label">產品分類</label>
                <select
                  id="description"
                  class="form-select"
                  v-model="form.category"
                >
                  <option value="" selected disabled hidden>請選擇分類</option>
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
                <label for="description" class="form-label">預計耗時</label>
                <select
                  id="description"
                  class="form-select"
                  v-model="form.finalTime"
                >
                  <option
                    v-for="hour in [1, 1.5, 2, 2.5, 3]"
                    :key="hour"
                    :value="hour"
                  >
                    {{ hour }} 小時
                  </option>
                </select>
              </div>

              <div class="col">
                <label for="price" class="form-label fw-bold">售價</label>
                <VeeField
                  v-number
                  class="form-control"
                  id="price"
                  name="售價"
                  type="text"
                  placeholder="請輸入售價"
                  v-model.number="form.origin_price"
                />
                <VeeErrorMessage name="售價" class="text-danger" />
              </div>
            </div>

            <div class="mb-3">
              <p class="form-label fw-bold">產品特色</p>
              <ul>
                <li
                  class="row align-items-center"
                  v-for="(item, index) in form.content"
                  :key="index"
                >
                  <div class="col-9 col-lg-10">
                    <VeeField
                      class="form-control mb-2"
                      :name="`產品特色${index}`"
                      type="text"
                      v-model="form.content[index]"
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
              <VeeErrorMessage name="產品特色0" class="text-danger" />
            </div>

            <div class="mb-3">
              <p class="form-label fw-bold">保存方式</p>
              <div class="d-flex gap-5 mb-3">
                <div
                  class="form-check"
                  v-for="(item, index) in saveModeList"
                  :key="item"
                >
                  <input
                    class="form-check-input"
                    type="radio"
                    name="saveMethods"
                    :id="`mode${index}`"
                    :checked="form.saveMode === index"
                    :value="index"
                    v-model="form.saveMode"
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
                  class="row align-items-center"
                  v-for="(item, index) in form.saveMethods"
                  :key="index"
                >
                  <div class="col-9 col-lg-10">
                    <VeeField
                      class="form-control mb-2"
                      :name="`保存方式${index}`"
                      type="text"
                      v-model="form.saveMethods[index]"
                      :readonly="!form.saveMode"
                    />
                  </div>
                  <div
                    class="col d-flex align-items-center gap-2 gap-lg-5 fs-4"
                    v-if="form.saveMode"
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
              <VeeErrorMessage name="保存方式0" class="text-danger" />
            </div>
          </div>
        </div>

        <div class="d-flex align-items-center gap-3">
          <p class="fw-bold">更多圖片</p>
          <div class="position-relative mb-3">
            <label
              for="updateMore"
              class="form-label position-relative z-1 btn btn-outline-secondary px-5"
              >上傳圖片</label
            >
            <input
              class="form-control position-absolute opacity-0 top-0 start-0"
              type="file"
              name=""
              id="updateMore"
              @change="uploadImage('imagesUrl', $event)"
            />
          </div>
        </div>
        <div class="row row-cols-2 row-cols-lg-5 g-3">
          <div
            class="col position-relative"
            v-for="(imgUrl, index) in form.imagesUrl"
            :key="index"
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
            取消
          </nuxt-link>
          <button type="submit" class="btn btn-lg btn-secondary">確認</button>
        </div>
      </VeeForm>
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import Products from '@/store/products';
import type { adminPost } from '@/interface/product';

const route = useRoute();
// const saveMode = ref<number>(0);
const saveModeList = ref<string[]>(['使用公版', '自定義']);
const productStore = Products();

const schema = {
  產品名稱: 'required',
  產品圖片: 'required',
  售價: 'required|min_value:0|integer',
  產品特色0: (val: string) => {
    return !!val || '產品特色 為必填';
  },
  保存方式0: (val: string) => {
    return !!val || '保存方式 為必填';
  },
};
let form = ref<adminPost>({
  title: '',
  category: '',
  origin_price: 0,
  price: 0,
  unit: '人',
  description: '',
  finalTime: 1,
  content: [''],
  saveMethods: [
    '製作完成:需2小時內冷藏。',
    '回家後請冷藏至少2小時,待內餡凝固再食用。',
    '冷藏保存。',
    '請於3天內食用完,口感較佳。',
  ],
  imageUrl: '',
  imagesUrl: [],
  is_enabled: 1,
  saveMode: 0,
});

onMounted(() => {
  nextTick(() => {
    if (route.params.id !== '0') {
      // 修改
      productStore.adminProductGet(route.params.id as string);
      console.log(productStore.product);
      form.value = { ...productStore.product } as adminPost;
    }
  });
}),
  watch(
    () => form.value.saveMode,
    (saveMode) => {
      form.value.saveMethods = saveMode
        ? ['']
        : [
            '製作完成:需2小時內冷藏。',
            '回家後請冷藏至少2小時,待內餡凝固再食用。',
            '冷藏保存。',
            '請於3天內食用完,口感較佳。',
          ];
    }
  );

function add(key: 'content' | 'saveMethods') {
  if (Object.keys(form.value).includes(key)) {
    form.value[key].push('');
  }
}
function del(key: 'content' | 'saveMethods', index: number) {
  if (Object.keys(form.value).includes(key)) {
    form.value[key].splice(index, 1);
  }
}

// 上傳圖片
async function uploadImage(formKey: 'imageUrl' | 'imagesUrl', e: Event) {
  const files = (e.target as HTMLInputElement).files;
  if (!files) return;
  const imgUrl = await upload(files);

  if (typeof form.value[formKey] === 'string') {
    form.value[formKey] = imgUrl;
  } else if (Array.isArray(form.value[formKey])) {
    (form.value[formKey] as string[]).push(imgUrl);
  }
}

// 送出表單
async function submit() {
  form.value.price = form.value.origin_price;
  form.value.description = `預計耗時: ${form.value.finalTime} h`;
  if (route.params.id !== '0' && form.value.id) {
    await productStore.adminPUT(form.value.id, form.value);
  } else {
    await productStore.adminAdd(form.value);
  }
  useRouter().push('/admin/products');
}
</script>
<style lang="scss" scoped>
.imageUrl {
  max-height: 300px;
  width: 100%;
  object-fit: cover;
}
</style>
