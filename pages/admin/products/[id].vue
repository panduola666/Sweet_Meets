<template>
  <NuxtLayout name="back">
    <h1 class="h4 fw-bold mb-5">修改品項 - 奧利奧蛋糕</h1>
    <VeeForm @submit="submit" :validation-schema="schema">
      <div class="row mb-3">
        <div class="col-lg-4">
          <!-- 產品圖片 -->
          <div class="mb-3">
            <label for="productImg" class="form-label fw-bold">產品圖片</label>
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
              name=""
              id="update"
            />
          </div>
        </div>

        <div class="col">
          <div class="row row-cols-2 mb-3">
            <div class="col">
              <label for="description" class="form-label">預計耗時</label>
              <select id="description" class="form-select" v-model="finalHour">
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
                class="form-control"
                id="price"
                name="售價"
                type="text"
                placeholder="請輸入售價"
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
                <div class="col d-flex align-items-center gap-2 gap-lg-5 fs-4">
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
                  :checked="saveMode === index"
                  :value="index"
                  v-model="saveMode"
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
                    :readonly="!saveMode"
                  />
                </div>
                <div
                  class="col d-flex align-items-center gap-2 gap-lg-5 fs-4"
                  v-if="saveMode"
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
            for="update"
            class="form-label position-relative z-1 btn btn-outline-secondary px-5"
            >上傳圖片</label
          >
          <input
            class="form-control position-absolute opacity-0 top-0 start-0"
            type="file"
            name=""
            id="update"
          />
        </div>
      </div>
      <div class="row row-cols-2 row-cols-lg-5 g-3">
        <div
          class="col position-relative"
          v-for="(i, index) in 5"
          :key="index"
        >
          <button
            type="button"
            class="btn btn-close position-absolute top-5 end-5 bg-white p-2 rounded-circle"
          ></button>
          <img
            src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29va2llfGVufDB8fDB8fHww"
            alt=""
            class="object-fit-cover w-100"
            height="150"
          />
        </div>
      </div>

      <div class="d-flex justify-content-end gap-3 my-6">
        <button type="reset" class="btn btn-lg btn-primary">取消</button>
        <button type="submit" class="btn btn-lg btn-secondary">確認</button>
      </div>
    </VeeForm>
  </NuxtLayout>
</template>
<script setup lang="ts">
const route = useRoute();

console.log(route);
const finalHour = ref<number>(1);
const saveMode = ref<number>(1);
const saveModeList = ref<string[]>(['使用公版', '自定義']);

const schema = {
  產品圖片: 'required',
  售價: 'required|min_value:0|integer',
  產品特色0: (val: string) => {
    return !!val || '產品特色 為必填';
  },
  保存方式0: (val: string) => {
    return !!val || '保存方式 為必填';
  },
};

watch(
  () => saveMode.value,
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

const form = ref({
  title: '',
  category: '',
  origin_price: 0,
  price: 0,
  unit: '人',
  description: '',
  finalTime: 1,
  content: [''],
  saveMethods: [''],
  imageUrl:
    'https://plus.unsplash.com/premium_photo-1664283734034-9eac59c2bc7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29va2llfGVufDB8fDB8fHww',
  imagesUrl: [],
  is_enabled: 1,
});

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
function submit(value: any, { resetForm }: any) {
  console.log('送出表單');

  resetForm();
}
</script>
<style lang="scss" scoped>
.imageUrl {
  max-height: 300px;
  width: 100%;
  object-fit: cover;
}
</style>
