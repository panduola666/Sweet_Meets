<template>
  <div
    id="productModal"
    ref="productModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productName"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable"
    >
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="closeModal"
          ></button>
        </div>
        <div v-if="product.id" class="modal-body">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12 col-lg-6 mb-4 mb-lg-0">
                <Swiper v-bind="swiperConfig">
                  <SwiperSlide class="pb-4">
                    <img
                      :src="product.imageUrl"
                      :alt="product.title"
                      class="object-fit-cover productImg"
                    />
                  </SwiperSlide>
                  <SwiperSlide
                    v-for="item in product.imagesUrl"
                    :key="item"
                    class="pb-4"
                  >
                    <img
                      :src="item"
                      :alt="product.title"
                      class="object-fit-cover productImg"
                    />
                  </SwiperSlide>
                </Swiper>
              </div>
              <div class="col-12 col-lg-6">
                <article>
                  <p
                    class="d-flex justify-content-between align-items-end h3 fw-bold"
                  >
                    {{ product.title }}
                    <small class="fs-6">{{ product.description }}</small>
                  </p>
                  <p>{{ $t('order.rule14') }}</p>
                  <p class="fs-5 fw-bold mb-0">[{{ $t('product.feature') }}]</p>
                  <ul class="mb-3 list-disc ps-5">
                    <li
                      v-for="(content, index) in product.content"
                      :key="`特色${index}`"
                    >
                      {{ content }}
                    </li>
                  </ul>
                  <p class="fs-5 fw-bold mb-0">
                    [{{ $t('product.saveMethod') }}]
                  </p>
                  <ul class="list-disc ps-5">
                    <li
                      v-for="(saveContent, index) in product.saveMethods"
                      :key="`保存${index}`"
                    >
                      {{ saveContent }}
                    </li>
                  </ul>
                </article>
                <p class="text-end fs-2 fw-bold m-0">
                  {{ moneyFormat(product.price) }}
                </p>
              </div>
            </div>
            <ol class="alert alert-primary lh-lg mb-3" role="alert">
              <li v-for="(item, index) in tips" :key="item">
                {{ index + 1 }}. {{ item }}
              </li>
            </ol>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="closeModal">
            {{ $t('common.close') }}
          </button>
          <button class="btn btn-secondary" @click="orderProduct">
            {{ $t('common.quickOrder') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Swiper, SwiperSlide } from '#build/components'
import Carts from '@/store/cart'
import type { adminPost } from '@/interface/product'

interface propsType {
  product: adminPost
}
const props = defineProps<propsType>()
const emit = defineEmits(['close'])
const { product } = toRefs(props)
const cartStore = Carts()
const { $bootstrap } = useNuxtApp()
const productModal = ref(null)
let modal: any

watch(
  () => product?.value,
  async () => {
    await nextTick()
    if (product?.value.id) {
      modal = $bootstrap.modal(productModal.value)
      modal.show()
    }
  },
)
function closeModal() {
  modal.hide()
  emit('close', 0)
}

const router = useRouter()
async function orderProduct() {
  if (!product?.value.id) return
  await cartStore.addCart({
    product_id: product?.value.id,
    qty: 1,
  })
  closeModal()
  router.push('/order')
}

const swiperConfig = ref({
  observer: true,
  modules: [SwiperAutoplay, SwiperPagination],
  pagination: {
    clickable: true,
  },
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
})
const tips = ref([
  i18nT('order.rule2'),
  i18nT('order.rule3'),
  i18nT('order.rule13'),
])
</script>

<style lang="scss" scoped>
.productImg {
  width: 100%;
  height: 100%;
  object-position: center center;
  height: 200px;
  cursor: grab;
  @include lg {
    clip-path: var(--clip-path-diamond);
    height: 400px;
  }
}
.list-disc {
  list-style: disc;
}
#productModal {
  --bs-modal-header-border-width: 0;
  --bs-modal-footer-border-width: 0;
}
</style>
