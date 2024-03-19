<template>
  <div>
    <NuxtLayout name="back">
      <div class="text-end mb-3">
        <nuxt-link
          to="/admin/activities/0"
          class="btn btn-lg btn-secondary px-6"
          >{{ $t('activity.add') }}</nuxt-link
        >
      </div>
      <div class="table-responsive">
        <table class="table table-bordered align-middle text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">{{ $t('common.title') }}</th>
              <th scope="col" class="d-none d-lg-block">
                {{ $t('activity.cover') }}
              </th>
              <th scope="col">{{ $t('activity.time') }}</th>
              <th scope="col">{{ $t('common.operate') }}</th>
            </tr>
          </thead>
          <tbody v-if="ArticleStore.articles" class="fs-lg-5 text-nowrap">
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
              <td>
                <p class="mb-0">{{ item.description }}</p>
                <small
                  v-if="!checkDate(item.description)"
                  class="fs-small text-danger"
                  >- {{ $t('activity.overTime') }} -</small
                >
              </td>
              <td class="py-7">
                <TableOperate :id="item.id" :title="item.title" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-3 mb-6">
        <Pagination :pagination="ArticleStore.pagination" @click="getDate" />
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import Article from '@/store/article'

const ArticleStore = Article()

onMounted(() => {
  nextTick(async () => {
    await getDate(1)
  })
})
function getDate(page: string | number) {
  ArticleStore.adminGet(page)
}
</script>
