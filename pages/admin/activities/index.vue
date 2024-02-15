<template>
  <div>
    <NuxtLayout name="back">
      <div class="text-end mb-3">
        <nuxt-link
          to="/admin/activities/0"
          class="btn btn-lg btn-secondary px-6"
          >新增活動</nuxt-link
        >
      </div>
      <table class="table table-bordered align-middle text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">標題</th>
            <th scope="col" class="d-none d-lg-block">活動封面</th>
            <th scope="col">活動時間</th>
            <th scope="col">操作</th>
          </tr>
        </thead>
        <tbody class="fs-lg-5" v-if="ArticleStore.articles">
          <tr v-for="(item, index) in ArticleStore.articles" :key="item.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ item.title }}</td>
            <td class="d-none d-lg-block">
              <img
                :src="item.image"
                :alt="item.title"
                height="100"
                width="200"
                class="object-fit-cover"
              />
            </td>
            <td>{{ item.description }}</td>
            <td class="py-7">
              <table-operate :id="item.id"/>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="mt-3 mb-6">
        <Pagination :pagination="ArticleStore.pagination" @click="getDate" />
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import Article from '@/store/article'

const ArticleStore = Article();

onMounted(() => {
  nextTick(async() => {
    await getDate(1)
  })
})
function getDate (page: string|number) {
  ArticleStore.adminGet(page)
}
</script>