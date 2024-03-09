<template>
  <div class="d-flex align-items-center justify-content-center gap-2">
    <div
      class="pointer p-2 border d-flex align-items-center bg-white position-relative h-100 search"
      @click="getDetail(id)"
    >
      <span class="position-absolute tip search-tip">{{
        $t('common.detail')
      }}</span>
      <img
        src="@/assets/icons/search.svg"
        alt="search"
        width="20"
        height="20"
        style="margin-bottom: 0.125em"
      />
    </div>

    <NuxtLink :to="`/admin/activities/${id}`" class="position-relative edit">
      <span class="position-absolute tip edit-tip">{{
        $t('common.edit')
      }}</span>
      <NuxtIcon
        filled
        name="edit"
        class="pointer p-2 border operate-btn d-flex align-items-center bg-white"
      />
    </NuxtLink>

    <div class="position-relative delete" @click="deleteArticle(id)">
      <span class="position-absolute tip delete-tip">{{
        $t('common.delete')
      }}</span>
      <NuxtIcon
        filled
        name="delete"
        class="pointer p-2 border operate-btn d-flex align-items-center bg-white"
      />
    </div>
  </div>

  <!-- 詳情 Modal -->
  <div
    id="detail"
    ref="detailModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h1 id="exampleModalLabel" class="modal-title fs-5">
            {{ $t('activity.detail') }}
          </h1>
          <button
            type="button"
            class="btn-close"
            @click="modal.hide()"
          ></button>
        </div>
        <div class="modal-body contain">
          <div class="row">
            <img
              :src="detail.image"
              :alt="detail.title"
              class="col-12 col-lg-6 cover"
            />
            <article class="col text-start fs-6 text-wrap">
              <h2 class="fs-4 fw-bold">{{ detail.title }}</h2>
              <h3 class="fs-6 text-end mb-4">{{ detail.description }}</h3>
              <div v-html="detail.content" />
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Article from '@/store/article'
import type { ArticleDetail } from '@/interface/article'

const { $bootstrap } = useNuxtApp()
const ArticleStore = Article()
interface propsType {
  id: string
  title: string
}
const props = defineProps<propsType>()
const { id, title } = toRefs(props)

let modal: any
const detailModal = ref(null)
const detail = ref<ArticleDetail>({
  id: '',
  num: 0,
  title: '',
  description: '',
  image: '',
  tag: [],
  create_at: 0,
  author: '',
  isPublic: false,
  content: '',
})

onMounted(async () => {
  await nextTick(() => (modal = $bootstrap.modal(detailModal.value)))
})

async function getDetail(id: string) {
  await ArticleStore.adminDetail(id)
  detail.value = ArticleStore.article as ArticleDetail
  modal.show()
}

async function deleteArticle(id: string) {
  const swal = await useSwal({
    title: i18nT('placeholder.productDel', [title?.value]),
    showCancelButton: true,
    allowOutsideClick: false,
  })
  if (swal.isConfirmed) {
    await ArticleStore.adminDel(id)
    ArticleStore.adminGet(ArticleStore.pagination.current_page)
  }
}
</script>

<style lang="scss" scoped>
.cover {
  height: 300px;
  object-fit: cover;
  @include lg {
    clip-path: var(--clip-path-diamond);
    height: 500px;
  }
}
.operate-btn {
  svg {
    width: 20px;
    height: 20px;
  }
}
.tip {
  font-size: 12px;
  width: 100%;
  top: -25px;
  left: 0;
  right: 0;
  text-align: center;
  border: 1px solid #dee2e6;
  background: $white;
  border-radius: 3px;
  display: none;
}
.search:hover .search-tip {
  display: block;
}
.edit:hover .edit-tip {
  display: block;
}
.delete:hover .delete-tip {
  display: block;
}
</style>
