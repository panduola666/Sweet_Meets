<template>
  <div>
    <NuxtLayout name="default">
      <div class="container">
        <div class="text-end mb-3">
          <button
            type="button"
            class="btn btn-lg btn-outline-secondary fs-5"
            @click="openModal"
          >
            活動列表
          </button>
        </div>
        <div class="row pb-5 mb-5 gy-3 gy-lg-0">
          <div class="col-12 col-lg-6 placeholder-glow">
            <div
              class="activityImg"
              :class="{ placeholder: isLoading }"
              :style="{ backgroundImage: `url(${detail.image})` }"
            />
          </div>
          <div
            class="col-12 col-lg-6 d-flex flex-column justify-content-between gap-5 gap-lg-8 placeholder-glow"
          >
            <article class="fs-5 default">
              <h1 class="h2 fw-bold title" :class="{ placeholder: isLoading }">
                {{ detail.title }}
              </h1>
              <h2
                class="fs-5 fs-lg-4 fw-bold pb-3 mb-3 border-bottom border-secondary"
                :class="{ placeholder: isLoading }"
              >
                活動時間: {{ detail.description }}
                <span
                  v-if="checkTime(detail.description)"
                  class="badge text-bg-danger fs-6"
                  >已結束</span
                >
              </h2>
              <div
                :class="{ placeholder: isLoading }"
                v-html="detail.content"
              />
            </article>
            <NuxtLink
              :to="`/order?timer=${new Date(detail.description).getTime()}`"
              class="btn btn-secondary fs-4"
              :class="{ disabled: checkTime(detail.description) }"
              >立即報名</NuxtLink
            >
          </div>
        </div>
      </div>

      <!-- Modal -->
      <div
        ref="activityModal"
        class="modal fade"
        tabindex="-1"
        aria-labelledby="activities"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable"
        >
          <div class="modal-content">
            <div class="modal-header bg-secondary">
              <p id="activities" class="modal-title fs-5 text-white">
                活動列表
              </p>
              <button
                type="button"
                class="btn-close btn-close-white"
                @click="closeModal"
              ></button>
            </div>
            <div class="modal-body">
              <div v-if="isLoading" class="text-center py-9">
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
              <ul v-else class="mb-2 overflow-y-scroll modal-list w-100">
                <li
                  v-for="activity in activityList"
                  :key="activity.id"
                  class="py-2 px-4 border-bottom border-secondary pointer font-monospace activityItem"
                  @click="getDetail(activity.id)"
                >
                  <h3 class="fs-5 fw-bold mb-1">{{ activity.title }}</h3>
                  <p class="mb-0">
                    活動時間: {{ activity.description }}
                    <span
                      v-if="checkTime(activity.description)"
                      class="badge text-bg-danger fs-small"
                      >已結束</span
                    >
                  </p>
                </li>
              </ul>
              <Pagination
                :pagination="ArticleStore.pagination"
                @click="getDate"
              />
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import Article from '@/store/article'

const ArticleStore = Article()
const isLoading = ref<boolean>(false) // 文章 loading 佔位

const { $bootstrap } = useNuxtApp()
const activityModal = ref(null)
let modal: any
const activityId = ref<string>('')

const detail = computed(() => ArticleStore.article)
const activityList = computed(() => ArticleStore.articles)
onMounted(() => {
  activityId.value = useRoute().query.id as string
  nextTick(() => {
    modal = $bootstrap.modal(activityModal.value)
    isLoading.value = true
    if (activityId.value) {
      getDetail(activityId.value)
    } else {
      openModal()
    }
  })
})

async function getDetail(id: string) {
  isLoading.value = true
  activityId.value = id
  await ArticleStore.articleView(id)
  closeModal()
  isLoading.value = false
}

async function getDate(page: string | number) {
  await ArticleStore.articlesGet(page)
  isLoading.value = false
}

function checkTime(description: string): boolean {
  return new Date(description).getTime() <= new Date().getTime()
}

async function openModal() {
  modal.show()
  await getDate(1)
}

function closeModal() {
  if (activityId.value && activityList.value.length) {
    getDetail(activityList.value[0].id)
  } else {
    useSwal({
      title: '暫無活動',
      showConfirmButton: false,
      timer: 3000,
    })
    return
  }
  modal.hide()
}
</script>
<style lang="scss" scoped>
.activityImg {
  width: 100%;
  height: 100%;
  background: no-repeat center;
  background-size: cover;
  min-height: 200px;
  @include lg {
    min-height: 550px;
    clip-path: var(--clip-path-diamond);
  }
}

.activityItem:hover {
  background: rgba($color: $primary, $alpha: 0.1);
}
.modal-list {
  min-height: 20dvh;
  max-height: 50dvh;
}

.modal {
  transform: scale(0);
}
.modal.show {
  transform: scale(1);
}
.fade {
  transition: transform 0.15s linear;
}
</style>
