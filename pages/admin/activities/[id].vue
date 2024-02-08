<template>
  <div>
    <NuxtLayout name="back">
      <h1 class="h4 fw-bold mb-5">
        {{ route.params.id === '0' ? '新增活動' : '修改活動' }}
      </h1>
      <VeeForm @submit="submit" :validation-schema="schema">
        <div class="row pb-2 mb-2 border-bottom border-2 border-secondary">
          <div class="col-5">
            <img
              :src="form.image"
              :alt="form.title"
              class="cover w-100 img-fluid object-fit-cover"
            />
          </div>
          <div class="col" >
            <div class="mb-3">
              <div class="mb-3">
                <label for="cover" class="form-label fw-bold">活動圖片</label>
                <VeeField
                  class="form-control"
                  id="cover"
                  name="活動圖片"
                  type="text"
                  placeholder="請輸入圖片網址"
                  v-model="form.image"
                />
                <VeeErrorMessage name="活動圖片" class="text-danger" />
              </div>
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
                  @change="uploadImage('image', $event)"
                />
              </div>
            </div>
            <div class="mb-3">
              <label for="title" class="form-label fw-bold">標題</label>
              <VeeField
                class="form-control"
                id="title"
                name="標題"
                type="text"
                placeholder="請輸入活動標題"
                v-model="form.title"
              />
              <VeeErrorMessage name="標題" class="text-danger" />
            </div>
            <div class="mb-3">
              <label for="description" class="form-label fw-bold">活動時間</label>
              <VeeField
                class="form-control"
                id="description"
                name="活動時間"
                type="text"
                placeholder="請輸入活動時間"
                v-model="form.description"
              />
              <VeeErrorMessage name="活動時間" class="text-danger" />
            </div>
  
            <div class="mb-3">
                <p class="form-label fw-bold">活動內容</p>
                <div class="d-flex gap-5 mb-3">
                  <div
                    class="form-check"
                    v-for="(item, index) in contentList"
                    :key="item"
                  >
                    <input
                      class="form-check-input"
                      type="radio"
                      name="saveMethods"
                      :id="`mode${index}`"
                      :checked="contentMode === index"
                      :value="index"
                      v-model="contentMode"
                    />
                    <label
                      class="form-check-label fw-bold pointer"
                      :for="`mode${index}`"
                    >
                      {{ item }}
                    </label>
                  </div>
                </div>
                <textarea name="" id="" cols="30" rows="10" v-model="form.content"></textarea>
                <VeeErrorMessage name="保存方式0" class="text-danger" />
              </div>
          </div>
        </div>
        <div class="d-flex justify-content-end gap-3 my-6">
          <nuxt-link to="/admin/activities" class="btn btn-lg btn-primary">
            取消
          </nuxt-link>
          <button type="submit" class="btn btn-lg btn-secondary">確認</button>
        </div>
      </VeeForm>
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
const route = useRoute();

const schema = {
  活動圖片: 'required',
  標題: 'required',
  活動時間: 'required',
};

const contentList = ref<string[]>(['使用公版', '自定義']);
const contentMode = ref<number>(1);
  watch(
  () => contentMode.value,
  (contentMode) => {
    form.content = contentMode
      ? ''
      : `
      <p>還在苦惱平常太忙沒有時間交友嗎?又或者是擔心交友軟體不靠普, 擔心自己受騙導致顧慮重重?現在將推出同好聯誼活動, 無論是否是單身人士我們都很歡迎您的到來~在這裡你可以很輕鬆的交到擁有相同興趣的好友, 也不用擔心私下赴約是否安全, 我們提供了友善的公共空間讓您可以放鬆地沉浸在甜點裡面能在廣大人海中, 在此時此刻遇到擁有共同興趣的機會少之又少, 你還在等什麼? 快來報名吧!</p>`
  }
);

const form = reactive({
  title: '',
  description: '',
  image:
    'https://media.istockphoto.com/id/1468486548/photo/vegan-walnut-tart.webp?b=1&s=170667a&w=0&k=20&c=c-0qCBulZgqq4FOb8wO5tAjwN2fLesro6fuDWOLSdgQ=',
  tag: [],
  create_at: new Date().getTime() / 1000,
  author: '',
  isPublic: true,
  content: ''
});

function submit() {
  console.log('送出');
}

// 上傳圖片
async function uploadImage(formKey: 'image', e: Event) {
  const files = (e.target as HTMLInputElement).files;
  if (!files) return;
  const imgUrl = await upload(files);
  form[formKey] = imgUrl;
}
</script>

<style lang="scss" scoped>
.cover {
  clip-path: var(--clip-path-diamond);
  max-height: 650px;
}

// .imageUrl {
//   max-height: 200px;
//   width: 100%;
//   object-fit: cover;
// }
</style>
