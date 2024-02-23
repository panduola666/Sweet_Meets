<template>
<div class="modal fade" id="productModal" ref="productModal" tabindex="-1" aria-labelledby="productName" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
      </div>
      <div class="modal-body" v-if="product.id">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12 col-lg-6 mb-4 mb-lg-0">
              <div class="productImg" :style="{backgroundImage: `url(${product.imageUrl})`}">
              </div>
            </div>
            <div class="col-12 col-lg-6">
              <article>
                <p class="d-flex justify-content-between align-items-end h3 fw-bold">
                  {{ product.title }}
                  <small class="fs-6">{{ product.description }}</small>
                </p>
                <p class="">可兩人一同製作, 第三人需獨立製作一份甜點</p>
                <p class="fs-5 fw-bold mb-0">[產品特色]</p>
                <ul class="mb-3 list-disc ps-5">
                  <li v-for="(content, index) in product.content" :key="`特色${index}`">{{ content }}</li>
                </ul>
                <p class="fs-5 fw-bold mb-0">[保存方式]</p>
                <ul class="list-disc ps-5">
                  <li v-for="(saveContent, index) in product.saveMethods" :key="`保存${index}`">{{ saveContent }}</li>
                </ul>
              </article>
              <p class="text-end fs-2 fw-bold m-0">{{ moneyFormat(product.price) }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" @click="closeModal">關閉</button>
        <button class="btn btn-secondary" @click="orderProduct">立即預約</button>
      </div>
    </div>
  </div>
</div>
</template>
<script setup lang="ts">
const props = defineProps(['product'])
const emit = defineEmits(['close']);
const { product } = toRefs(props)

const { $bootstrap } = useNuxtApp()
const productModal = ref(null)
let modal:any;
watch(() => product?.value, async () => {
  await nextTick()
  if (product?.value.id) {
    modal = $bootstrap.modal(productModal.value)
    modal.show()
  }
})
function closeModal() {
  modal.hide()
  emit('close', 0)
}

const router = useRouter()
function orderProduct() {
  closeModal()
  console.log('加入購物車');
  
  router.push('/order')
}
</script>
<style lang="scss" scoped>
.productImg{
  width: 100%;
  height: 100%;
  background: no-repeat center;
  background-size: cover;
  min-height: 200px;
  @include lg {
    clip-path: var(--clip-path-diamond);
  }
}
.list-disc{
  list-style: disc;
}
#productModal{
  --bs-modal-header-border-width: 0;
  --bs-modal-footer-border-width: 0;
}
</style>