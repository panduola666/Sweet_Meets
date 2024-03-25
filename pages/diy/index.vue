<template>
  <div>
    <NuxtLayout name="default">
      <section class="container">
        <ul class="d-flex flex-column gap-6 mb-6">
          <li
            v-for="(category, index) in categoryList"
            :id="categoryId[index]"
            :key="category"
          >
            <h1
              class="h2 fw-bold pb-1 mb-3 border-bottom border-2 border-secondary default"
            >
              {{ category }}
              <span v-if="index === 0">{{ $t('product.birthOnly') }}</span>
            </h1>
            <ul class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
              <li
                v-for="product in productList[category]"
                :key="product.id"
                class="col"
                @click="productTemp = product"
              >
                <div class="card border-0 pointer overflow-hidden">
                  <img
                    :src="product.imageUrl"
                    class="card-img-top object-fit-cover"
                    :alt="product.title"
                    height="200"
                  />
                  <div
                    class="card-img-overlay card-content d-flex justify-content-between align-items-end"
                  >
                    <h2 class="card-title h4 fw-bold text-white mb-1">
                      {{ product.title }}
                    </h2>
                    <p class="card-text fs-5 fw-bold text-white">
                      {{ moneyFormat(product.price) }}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </section>
      <aside class="position-fixed end-0 top-50 translate-middle-y z-3">
        <ul class="bg-white bg-opacity-50 blur shadow rounded-4 fs-5">
          <li
            v-for="(item, index) in categoryList"
            :key="item + index"
            class="py-2 py-lg-3 px-3 px-lg-5 pointer"
            @click="scrollHash(`#${categoryId[index]}`)"
          >
            {{ item }}
          </li>
        </ul>
      </aside>
      <ProductModal :product="productTemp" @close="resetTemp" />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import Products from '@/store/products'
import type { adminPost } from '@/interface/product'

const { $scrollTo } = useNuxtApp()
const productStore = Products()

const productTemp = ref<adminPost>({
  title: '',
  category: '',
  origin_price: 0,
  price: 0,
  unit: '',
  description: '',
  finalTime: 0,
  content: [],
  saveMethods: [],
  imageUrl: '',
  imagesUrl: [],
  is_enabled: 0,
  saveMode: 0,
})
const categoryList = computed(() => productStore.categoryList)
const categoryId = ['birth', 'cake', 'cookie', 'pai']

const productList = computed(() => {
  return productStore.products.reduce(
    (obj: Record<string, any>, item: adminPost) => {
      Array.isArray(obj[item.category])
        ? obj[item.category].push(item)
        : (obj[item.category] = [item])
      return obj
    },
    {},
  )
})

onMounted(() => {
  nextTick(() => {
    productStore.productsGet()
  })
})

function scrollHash(id: string) {
  $scrollTo(id, { offset: -16 * 6 })
}

function resetTemp() {
  productTemp.value = {
    title: '',
    category: '',
    origin_price: 0,
    price: 0,
    unit: '',
    description: '',
    finalTime: 0,
    content: [],
    saveMethods: [],
    imageUrl: '',
    imagesUrl: [],
    is_enabled: 0,
    saveMode: 0,
  }
}
</script>

<style lang="scss" scoped>
.card {
  img {
    max-height: 250px;
    transition: transform 2s;
    @include lg {
      max-height: 300px;
    }
  }
  &-content {
    background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.4));
  }
  &:hover {
    img {
      transform: scale(1.1);
    }
  }
}
</style>
