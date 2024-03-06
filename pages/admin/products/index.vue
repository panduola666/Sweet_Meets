<template>
  <div>
    <NuxtLayout name="back" :breadPath="[currType]">
      <div class="text-end mb-3">
        <nuxt-link to="/admin/products/0" class="btn btn-lg btn-secondary px-6"
          >新增甜點</nuxt-link
        >
      </div>
      <div class="row g-3 g-lg-7">
        <aside class="col-12 col-lg-2">
          <ul
            class="bg-white mx-auto fs-lg-4 fw-bold text-center border border-secondary shadow-sm d-flex d-lg-block overflow-auto"
          >
            <li
              class="p-3 border-bottom border-end flex-shrink-0 flex-grow-1 border-secondary pointer product-nav"
              v-for="item in categoryList"
              :key="item"
              :class="{ active: currType === item }"
              @click="changeType(item)"
            >
              {{ item }}
            </li>
          </ul>
        </aside>
        <div class="col">
          <div
            class="row row-cols-2 row-cols-lg-5 g-4"
            v-if="productStore.products"
          >
            <div
              class="col"
              v-for="item in productStore.products"
              @click="editProduct(item)"
            >
              <div class="card product-card h-100">
                <img
                  :src="item.imageUrl"
                  class="card-img-top pointer object-fit-cover"
                  :alt="item.title"
                  height="150"
                />
                <div class="card-body p-2 p-lg-3">
                  <p class="card-title h5 fw-bold">{{ item.title }}</p>
                  <p
                    class="card-text fs-5 d-flex align-items-center justify-content-between"
                  >
                    <span>${{ item.price }}</span>
                    <nuxt-icon
                      name="delete"
                      class="pointer"
                      @click.stop="delProduct(item)"
                    />
                  </p>
                </div>
              </div>
            </div>
            <p
              v-show="!productStore.products.length"
              class="col-12 text-center fs-3"
            >
              暫無資料
            </p>
          </div>
        </div>
      </div>
      <div class="row justify-content-end mt-3 mb-6">
        <div class="col-lg-10">
          <Pagination :pagination="productStore.pagination" @click="getDate" />
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import Products from '@/store/products';

const productStore = Products();
const categoryList = ['全部', ...productStore.categoryList];
const currType = ref<string>(categoryList[0]);

onMounted(() => {
  nextTick(async () => {
    await getDate(1);
  });
});
function changeType(item: string) {
  currType.value = item;

  getDate(1);
}
function getDate(page: string | number) {
  productStore.adminGet({
    category: productStore.categoryList.includes(currType.value)
      ? currType.value
      : '',
    page: page.toString(),
  });
}

function editProduct(item: any) {
  productStore.product = item;

  useRouter().push(`/admin/products/${item.id}`);
}
async function delProduct(item: any) {
  const swal = await useSwal({
    title: `確定刪除<span class="text-danger mx-3">${item.title}</span>嗎?`,
    showCancelButton: true,
    allowOutsideClick: false,
  });
  if (swal.isConfirmed) {
    await productStore.adminDel(item.id);
    getDate(productStore.pagination.current_page || '1');
  }
}
</script>
<style lang="scss" scoped>
.product-nav {
  &.active {
    background: #825353;
    color: $white;
  }
  &:hover {
    background: $secondary;
    color: $white;
  }
}
.product-card {
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 1px 6px 2px rgba(0, 0, 0, 0.25);
  }
}
</style>
