<template>
  <NuxtLayout name="default">
    <div class="container">
      <div class="text-end mb-3">
        <button
          type="button"
          class="btn btn-lg btn-outline-secondary fs-5"
          @click="openModal"
        >
          活動列表
        </button>
      </div>
      <div class="row border-bottom border-2 border-secondary pb-5 mb-5 gy-3 gy-lg-0">
        <div class="col-12 col-lg-6 placeholder-glow">
          <div class="activityImg" :class="{placeholder: isLoading}" :style="{backgroundImage: `url(${'https://images.unsplash.com/photo-1701743806134-9a7bfe1ffc04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D'})`}"></div>
          <!-- <img
            src="https://images.unsplash.com/photo-1701743806134-9a7bfe1ffc04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D"
            alt=""
            class="activityImg"
          /> -->
        </div>
        <div class="col-12 col-lg-6 d-flex flex-column justify-content-between gap-5 gap-lg-8 placeholder-glow">
          <article class="fs-5">
            <h1 class="h2 fw-bold title" :class="{placeholder: isLoading}">11月甜點聯誼會</h1>
            <h2 class="fs-5 fs-lg-4 fw-bold pb-3 mb-3 border-bottom border-secondary" :class="{placeholder: isLoading}">活動時間: 2023/11/11 (六) 20:00</h2>
            <div :class="{placeholder: isLoading}">
              <p>
                還在苦惱平常太忙沒有時間交友嗎? 又或者是擔心交友軟體不靠普,
                擔心自己受騙導致顧慮重重?
              </p>
              <p>
                現在將推出同好聯誼活動, 無論是否是單身人士我們都很歡迎您的到來~
              </p>
              <p>
                在這裡你可以很輕鬆的交到擁有相同興趣的好友,
                也不用擔心私下赴約是否安全,
                我們提供了友善的公共空間讓您可以放鬆地沉浸在甜點裡面
              </p>
              <p>
                能在廣大人海中, 在此時此刻遇到擁有共同興趣的機會少之又少,
                你還在等什麼? 快來報名吧!
              </p>
            </div>
          </article>
          <NuxtLink to="" class="btn btn-secondary fs-4">立即報名</NuxtLink>
        </div>
      </div>
      <div class="d-flex justify-content-between justify-content-lg-end fs-5 gap-7">
        <span class="pointer">上一則</span>
        <span class="pointer">下一則</span>
      </div>

    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      ref="activityModal"
      tabindex="-1"
      aria-labelledby="activities"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header bg-secondary">
            <p class="modal-title fs-5 text-white" id="activities">活動列表</p>
            <button
              type="button"
              class="btn-close btn-close-white"
              @click="closeModal"
            ></button>
          </div>
          <div class="modal-body">
            <ul>
              <li class="py-2 px-4 border-bottom border-secondary pointer font-monospace activityItem" v-for="i in 10">
                <h3 class="fs-5 fw-bold mb-1">11月甜點聯誼會</h3>
                <p class="mb-0">活動時間: 2023/11/11 (六) 20:00</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
<script setup lang="ts">
const isLoading = ref<boolean>(false)

const { $bootstrap } = useNuxtApp()
const activityModal = ref(null)
let modal:any;
onMounted(() => {
  nextTick(() => openModal())
  
})

function openModal () {
  modal = $bootstrap.modal(activityModal.value)
  modal.show()
}

function closeModal() {
  modal.hide()
}
</script>
<style lang="scss" scoped>
.activityImg {
  width: 100%;
  height: 100%;
  background: no-repeat center;
  background-size: cover;
  min-height: 200px;
  @include lg {
    min-height: 550px;
    clip-path: var(--clip-path-diamond);
  }
}

.activityItem:hover{
  background: rgba($color: $primary, $alpha: .1);
}
.modal-body{
  height: 50dvh;
}

.modal{
  transform: scale(0);
}
.modal.show{
  transform: scale(1);
}
.fade{
  transition: transform 0.15s linear;
}
</style>
