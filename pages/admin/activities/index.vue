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
        <tbody class="fs-lg-5">
          <tr>
            <th scope="row">1</th>
            <td>11 月甜點聯誼會</td>
            <td class="d-none d-lg-block">
              <img
                src="https://media.istockphoto.com/id/1468486548/photo/vegan-walnut-tart.webp?b=1&s=170667a&w=0&k=20&c=c-0qCBulZgqq4FOb8wO5tAjwN2fLesro6fuDWOLSdgQ="
                alt=""
                height="100"
                width="200"
                class="object-fit-cover"
              />
            </td>
            <td>2023/11/11 (六) 20:00</td>
            <td class="py-7">
              <table-operate />
            </td>
          </tr>
        </tbody>
      </table>

      <div class="mt-3 mb-6">
        <Pagination :pagination="{}" @click="" />
      </div>
    </NuxtLayout>
  </div>
</template>
