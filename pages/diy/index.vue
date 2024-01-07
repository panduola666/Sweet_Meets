<template>
  <NuxtLayout name="default">
    <section class="container">
      <ul class="d-flex flex-column gap-6 mb-6">
        <li id="birth">
          <h1 class="h2 fw-bold pb-1 mb-3 border-bottom border-2 border-secondary default">
            壽星優惠(限當日壽星)
          </h1>
          <ul class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
            <li class="col" v-for="i in 4" @click="product = {id: i}">
              <div class="card border-0 pointer overflow-hidden">
                <img src="https://images.unsplash.com/photo-1573811409568-023d5d0110af?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTcyfHxjb29raW5nfGVufDB8MXwwfHx8MA%3D%3D" class="card-img-top object-fit-cover" alt="" />
                <div class="card-img-overlay card-content d-flex justify-content-between align-items-end">
                  <h2 class="card-title h4 fw-bold text-white mb-1">奧利奧蛋糕</h2>
                  <p class="card-text fs-5 fw-bold text-white">$150</p>
                </div>
              </div>
            </li>
          </ul>
        </li>
        <li id="cake">
          <p class="h2 fw-bold pb-1 mb-3 border-bottom border-2 border-secondary default">
            蛋糕
          </p>
          <ul class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
            <li class="col" v-for="i in 4" @click="product = {id: i}">
              <div class="card border-0 pointer overflow-hidden">
                <img src="https://images.unsplash.com/photo-1573811409568-023d5d0110af?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTcyfHxjb29raW5nfGVufDB8MXwwfHx8MA%3D%3D" class="card-img-top object-fit-cover" alt="" />
                <div class="card-img-overlay card-content d-flex justify-content-between align-items-end">
                  <h2 class="card-title h4 fw-bold text-white mb-1">奧利奧蛋糕</h2>
                  <p class="card-text fs-5 fw-bold text-white">$150</p>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </section>
    <aside class="position-fixed end-0 top-50 translate-middle-y">
      <ul class="bg-white bg-opacity-50 blur shadow rounded-4 fs-5">
        <li class="py-2 py-lg-3 px-3 px-lg-5 pointer" @click="scrollHash('#birth')">壽星優惠</li>
        <li class="py-2 py-lg-3 px-3 px-lg-5 pointer" @click="scrollHash('#cake')">蛋糕</li>
      </ul>
    </aside>
    <product-modal :product="product"/>
  </NuxtLayout>
</template>
<script setup lang="ts">
const { $scrollTo } = useNuxtApp()
const product = ref({})

function scrollHash(id: string) {
  $scrollTo(id, {offset: - 16 * 6})
}

</script>
<style lang="scss" scoped>
.card{
  img{
    max-height: 250px;
    transition: transform 2s;
    @include lg {
      max-height: 300px;
    }
  }
  &-content{
    background: linear-gradient(180deg, transparent, rgba(0,0,0,.4));
    
  }
  &:hover{
    img{
      transform: scale(1.1);
    }
  }
}
</style>
