<template>
<div class="modal fade" id="productModal" ref="productModal" tabindex="-1" aria-labelledby="productName" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
      </div>
      <div class="modal-body">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12 col-lg-6 mb-4 mb-lg-0">
              <div class="productImg" :style="{backgroundImage: `url(${'https://images.unsplash.com/photo-1596529267076-07866e3655cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fGNha2V8ZW58MHwxfDB8fHww'})`}">
              </div>
            </div>
            <div class="col-12 col-lg-6">
              <article>
                <p class="d-flex justify-content-between align-items-end h3 fw-bold">
                  酸甜檸檬塔
                  <small class="fs-6">耗時: 2.5 h</small>
                </p>
                <p class="">可兩人一同製作, 第三人需獨立製作一份甜點</p>
                <p class="fs-5 fw-bold mb-0">[產品特色]</p>
                <ul class="mb-3 list-disc ps-5">
                  <li>主體:原味派皮</li>
                  <li>內餡:檸檬蛋奶餡</li>
                  <li>裝飾:檸檬皮屑、糖粉</li>
                </ul>
                <p class="fs-5 fw-bold mb-0">[保存方式]</p>
                <ul class="list-disc ps-5">
                  <li>製作完成:需2小時內冷藏。</li>
                  <li>回家後請冷藏至少2小時,待內餡凝固再食用。</li>
                  <li>冷藏保存。</li>
                  <li>請於3天內食用完,口感較佳。</li>
                </ul>
              </article>
              <p class="text-end fs-2 fw-bold m-0">$450</p>
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

const { $bootstrap } = useNuxtApp()
const productModal = ref(null)
let modal:any;
watch(() => props.product, () => {
  console.log(props.product);
  modal = $bootstrap.modal(productModal.value)
  modal.show()
})
function closeModal() {
  modal.hide()
}

const router = useRouter()
function orderProduct() {
  closeModal()
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