<template>
  <div>
    <NuxtLayout name="back">
      <h1 class="h4 fw-bold mb-5">
        {{ route.params.id === '0' ? $t('activity.add') : $t('activity.edit') }}
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
                <label for="cover" class="form-label fw-bold">{{
                  $t('activity.image')
                }}</label>
                <VeeField
                  id="cover"
                  v-model.trim="form.image"
                  class="form-control"
                  :name="$t('activity.image')"
                  type="text"
                  :placeholder="$t('placeholder.imageURL')"
                />
                <VeeErrorMessage
                  :name="$t('activity.image')"
                  class="text-danger"
                />
              </div>
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
                  @change="uploadImage('image', $event)"
                />
              </div>
            </div>
            <div class="mb-3">
              <label for="title" class="form-label fw-bold">{{
                $t('common.title')
              }}</label>
              <VeeField
                id="title"
                v-model.trim="form.title"
                class="form-control"
                :name="$t('common.title')"
                type="text"
                :placeholder="$t('placeholder.activityTitle')"
              />
              <VeeErrorMessage :name="$t('common.title')" class="text-danger" />
            </div>
            <div class="mb-3">
              <label for="description" class="form-label fw-bold">{{
                $t('activity.time')
              }}</label>
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
                    :name="$t('activity.time')"
                    type="text"
                    :placeholder="$t('placeholder.activityTime')"
                    v-on="inputEvents"
                  />
                </template>
              </VDatePicker>
              <VeeErrorMessage
                :name="$t('activity.time')"
                class="text-danger"
              />
            </div>

            <div class="mb-3">
              <div
                class="d-flex align-items-center justify-content-between mb-2"
              >
                <p class="form-label fw-bold">{{ $t('activity.content') }}</p>
                <button
                  type="button"
                  class="btn btn-sm btn-secondary"
                  @click="setContent"
                >
                  {{ $t('common.quickCreate') }}
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
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-end gap-3 my-6">
          <nuxt-link to="/admin/activities" class="btn btn-lg btn-primary">
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
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import Article from '@/store/article'
import type { postArticle, ArticleDetail } from '@/interface/article'

const route = useRoute()
const ArticleStore = Article()

const date = ref<number>(
  new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000,
)

const schema = computed(() => {
  return {
    [i18nT('activity.image')]: 'required',
    [i18nT('common.title')]: 'required',
    [i18nT('activity.time')]: (val: string) => {
      if (!val) {
        return i18nT('error.required', [i18nT('activity.time')])
      }
      if (date.value < new Date().getTime()) {
        return i18nT('error.overTime', [i18nT('activity.time')])
      }
      return true
    },
  }
})

const form = ref<postArticle>({
  title: '',
  description: '',
  image: '',
  tag: [i18nT('activity.tag')],
  create_at: new Date().getTime(),
  author: i18nT('activity.author'),
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
  form.value.content = i18nT('activity.commonContent')
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
