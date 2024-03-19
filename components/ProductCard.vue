<template>
  <div v-if="product" class="card">
    <div class="row g-0">
      <div class="col-5">
        <img
          v-if="product.id"
          :src="product.imageUrl"
          class="w-100 object-fit-cover rounded-start"
          height="170"
          :alt="product.title"
        />
        <img
          v-else
          src="@/assets/img/home/activiryBanner.png"
          class="w-100 object-fit-cover rounded-start"
          height="170"
          alt="到店選擇"
        />
      </div>
      <div class="col-7">
        <div class="card-body">
          <h5 class="card-title h3 fw-bold text-truncate">
            {{ product.id ? product.title : $t('product.inStore') }}
          </h5>
          <p class="card-text fs-4 fw-bold">
            {{
              product.id ? moneyFormat(product.price) : $t('order.inStorePrice')
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { adminPost } from '@/interface/product'

interface propsType {
  product: adminPost
}
const props = defineProps<propsType>()
const { product } = toRefs(props)
</script>
