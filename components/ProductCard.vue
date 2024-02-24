<template>
  <div class="card" v-if="product">
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
          <h5 class="card-title h3 fw-bold text-truncate">{{ product.id ? product.title : '到店選擇' }}</h5>
          <p class="card-text fs-4 fw-bold">{{ product.id ?  moneyFormat(product.price) : '依品項價格' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps(['product']);
const { product } = toRefs(props)


</script>