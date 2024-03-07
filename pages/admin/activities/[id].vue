<template>
  <div>
    <NuxtLayout name="back">
      <h1 class="h4 fw-bold mb-5">
        {{ route.params.id === '0' ? '新增活動' : '修改活動' }}
      </h1>
      <VeeForm :validation-schema="schema" @submit="submit">
        <div class="row pb-2 mb-2 border-bottom border-2 border-secondary">
          <div class="col-lg-5">
            <img
              v-if="form.image"
              :src="form.image"
              :alt="form.title"
              class="cover w-100 img-fluid object-fit-cover"
            />
          </div>
          <div class="col">
            <div class="mb-3">
              <div class="mb-3">
                <label for="cover" class="form-label fw-bold">活動圖片</label>
                <VeeField
                  id="cover"
                  v-model.trim="form.image"
                  class="form-control"
                  name="活動圖片"
                  type="text"
                  placeholder="請輸入圖片網址"
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
                  id="update"
                  class="form-control position-absolute opacity-0 top-0 start-0"
                  type="file"
                  @change="uploadImage('image', $event)"
                />
              </div>
            </div>
            <div class="mb-3">
              <label for="title" class="form-label fw-bold">標題</label>
              <VeeField
                id="title"
                v-model.trim="form.title"
                class="form-control"
                name="標題"
                type="text"
                placeholder="請輸入活動標題"
              />
              <VeeErrorMessage name="標題" class="text-danger" />
            </div>
            <div class="mb-3">
              <label for="description" class="form-label fw-bold"
                >活動時間</label
              >
              <VDatePicker
                v-model="date"
                mode="dateTime"
                trim-weeks
                is24hr
                hide-time-header
                :rules="{ hours: [18, 19, 20, 21], minutes: 0 }"
                :disabled-dates="[{ start: null, end: new Date() }]"
              >
                <template #default="{ inputEvents }">
                  <VeeField
                    id="description"
                    v-model.trim="form.description"
                    class="form-control"
                    name="活動時間"
                    type="text"
                    placeholder="請輸入活動時間"
                    v-on="inputEvents"
                  />
                </template>
              </VDatePicker>
              <!-- <VeeField
                class="form-control"
                id="description"
                name="活動時間"
                type="text"
                placeholder="請輸入活動時間"
                v-model="form.description"
              /> -->
              <VeeErrorMessage name="活動時間" class="text-danger" />
            </div>

            <div class="mb-3">
              <div
                class="d-flex align-items-center justify-content-between mb-2"
              >
                <p class="form-label fw-bold">活動內容</p>
                <button
                  type="button"
                  class="btn btn-sm btn-secondary"
                  @click="setContent"
                >
                  一鍵生成
                </button>
              </div>
              <ClientOnly>
                <QuillEditor
                  v-model:content="form.content"
                  theme="snow"
                  toolbar="minimal"
                  content-type="html"
                />
              </ClientOnly>
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
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import Article from '@/store/article'
import type { postArticle, ArticleDetail } from '@/interface/article'

const route = useRoute()
const ArticleStore = Article()

const date = ref<number>(
  new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000,
)

const schema = {
  活動圖片: 'required',
  標題: 'required',
  活動時間: (val: string) => {
    if (!val) {
      return '活動時間 為必填'
    }
    if (date.value < new Date().getTime()) {
      return '當前 活動時間 已過期'
    }
    return true
  },
}

const form = ref<postArticle>({
  title: '',
  description: '',
  image: '',
  tag: ['同好會'],
  create_at: new Date().getTime(),
  author: '管理員',
  isPublic: true,
  content: '',
})

onMounted(() => {
  nextTick(async () => {
    if (route.params.id !== '0') {
      // 修改
      await ArticleStore.adminDetail(route.params.id as string)
      const detail: ArticleDetail = ArticleStore.article as ArticleDetail
      if (detail.id) delete detail.id
      if (detail.num) delete detail.num
      form.value = detail
      date.value = new Date(form.value.description).getTime()
    } else {
      form.value.description = getDateStr(date.value)
    }
  })
})
watch(
  () => date.value,
  () => {
    form.value.description = getDateStr(date.value)
  },
)

async function submit() {
  if (route.params.id !== '0') {
    await ArticleStore.adminPUT(route.params.id as string, form.value)
  } else {
    await ArticleStore.addArticle(form.value)
  }
  useRouter().push('/admin/activities')
}

// 上傳圖片
async function uploadImage(formKey: 'image', e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (!files) return
  const imgUrl = await upload(files)
  form.value[formKey] = imgUrl
}

// 活動公版內容
function setContent() {
  form.value.content = `<p>還在苦惱平常太忙沒有時間交友嗎?</p><p>又或者是擔心交友軟體不靠普, 擔心自己受騙導致顧慮重重?</p><p><br></p><p>現在將推出同好聯誼活動, 無論是否是單身人士我們都很歡迎您的到來~</p><p>在這裡你可以很輕鬆的交到擁有相同興趣的好友, 也不用擔心私下赴約是否安全, 我們提供了友善的公共空間讓您可以放鬆地沉浸在甜點裡面能在廣大人海中, 在此時此刻遇到擁有共同興趣的機會少之又少...</p><p><br></p><p>你還在等什麼? 快來報名吧!</p>`
}
</script>

<style lang="scss" scoped>
.cover {
  min-height: 200px;
  max-height: 200px;
  @include lg {
    clip-path: var(--clip-path-diamond);
    max-height: 650px;
  }
}

// .imageUrl {
//   max-height: 200px;
//   width: 100%;
//   object-fit: cover;
// }
:deep(.ql-editor) {
  min-height: 200px;
  max-height: 250px;
}
:deep(.ql-toolbar.ql-snow) {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background: #fff;
}
:deep(.ql-container.ql-snow) {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background: #fff;
}
</style>
