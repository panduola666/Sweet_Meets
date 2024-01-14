<template>
  <NuxtLayout name="back" :breadPath="[currType]">
      <div class="text-end mb-3">
        <nuxt-link to="/admin/products/0" class="btn btn-lg btn-secondary px-6"
          >新增甜點</nuxt-link
        >
      </div>
      <div class="row g-3 g-lg-7">
        <aside class="col-12 col-lg-2">
          <ul class="bg-white mx-auto fs-lg-4 fw-bold text-center border border-secondary shadow-sm d-flex d-lg-block overflow-auto">
            <li
              class="p-3 border-bottom border-end flex-shrink-0 flex-grow-1 border-secondary pointer product-nav"
              v-for="item in aside"
              :key="item"
              :class="{active: currType === item}"
              @click="currType = item"
            >
              {{ item }}
            </li>
          </ul>
        </aside>
        <div class="col">
          <div class="row g-4">
            <div class="col-md-4 col-lg-3" v-for="i in 6">
              <nuxt-link to="/admin/products/3" class="card product-card">
                <img src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29va2llfGVufDB8fDB8fHww" class="card-img-top pointer object-fit-cover" alt="" height="150" />
                <div class="card-body p-2 p-lg-3">
                  <p class="card-title h5 fw-bold">巧克力豆餅乾</p>
                  <p class="card-text fs-5 d-flex align-items-center justify-content-between">
                   <span>$150</span>
                   <nuxt-icon name="delete" class="pointer"/>
                  </p>
                  <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-end mt-3 mb-6">
        <div class="col-lg-10">
          <Pagination/>
        </div>
      </div>
  </NuxtLayout>
</template>
<script setup lang="ts">
const aside = ref<string[]>(['壽星優惠', '蛋糕', '餅乾', '塔派']);
const currType = ref<string>(aside.value[0])
</script>
<style lang="scss" scoped>
.product-nav{
  &.active{
    background: #825353;
    color: $white;
  }
  &:hover{
    background: $secondary;
    color: $white;
  }
}
.product-card{
  &:hover{
    transform: translateY(-5px);
    box-shadow: 0px 1px 6px 2px rgba(0, 0, 0, 0.25);
  }
}
</style>