<template>
  <NuxtLayout name="default">
    <div class="banner mx-3 mx-lg-9 position-relative">
      <img
        src="../../assets/svg/banner.svg"
        alt="banner"
        class="d-none d-lg-block w-100 rounded-4"
      />
      <img
        src="../../assets/svg/banner-sm.svg"
        alt="banner"
        class="d-lg-none w-100 rounded-4"
      />
      <section class="banner-content blur boxShadow p-6 p-lg-7">
        <h1 class="fs-2 fw-bold mb-6 mb-lg-7">相遇甜點，<br />開始甜蜜相約</h1>
        <button type="button" class="btn btn-secondary fs-lg-3 w-100 py-3">
          開始課程
        </button>
      </section>
    </div>

    <nav class="container my-lg-9 my-8">
      <div class="d-flex align-items-center gap-9">
        <div class="d-none d-lg-block">
          <p
            class="nav-tab text-center p-7 bg-white bg-opacity-50 blur boxShadow rounded-4"
          >
            <img src="../../assets/svg/homeTag.svg" alt="相遇甜點" width="80" />
          </p>
        </div>
        <div
          class="d-flex flex-column flex-lg-row justify-content-between gap-6 gap-lg-0 flex-grow-1"
        >
          <div
            class="home-nav d-flex fw-bold"
            v-for="(link, index) in homeNav"
            :key="link.route"
          >
            <NuxtLink
              :to="link.route"
              class="nav-link"
              :style="`background-image: url(${link.imgUrl});`"
            >
              <div
                class="nav-name bg-black bg-opacity-50 text-white fs-3 d-flex justify-content-around align-items-center"
              >
                {{ link.name }}
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <div class="order bg-primary py-6 py-lg-7">
      <h2 class="h1 fw-bold text-center mb-6">快速預約</h2>
      <div class="products" @mouseover="pauseSlider" @mouseleave="resumeSlider">
        <Swiper
          ref="swiper"
          v-bind="swiperConfig"
        >
          <SwiperSlide v-for="i in 10" @click="product = {id: i}">
              <div class="text-center pointer">
                <img
                  src="https://images.unsplash.com/photo-1596529267076-07866e3655cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fGNha2V8ZW58MHwxfDB8fHww"
                  height="375"
                  alt=""
                  class="w-100 object-fit-cover mb-6"
                />
                <p class="fs-3 m-0">甜點名稱</p>
              </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
    <product-modal :product="product"/>
  </NuxtLayout>
</template>
<script setup lang="ts">
import type { homeNav } from '@/interface/home';
import diyImg from '@/assets/img/diy.png';
import activityImg from '@/assets/img/activity.png';
import placeImg from '@/assets/img/place.png';

const route = useRoute();
const homeNav = ref<homeNav[]>([
  {
    route: '/diy',
    name: 'DIY 課程',
    imgUrl: diyImg,
  },
  {
    route: '/activity',
    name: '活動預約',
    imgUrl: activityImg,
  },
  {
    route: '/place',
    name: '場地租借',
    imgUrl: placeImg,
  },
]);

const product = ref({})
const swiper = ref<{ [key: string]: any } | null>(null);
const swiperConfig = ref({
  modules: [SwiperAutoplay],
  speed: 2000,
  loop: true,
  autoplay: {
    delay: 0,  
    disableOnInteraction: true,
  },
  spaceBetween: 16,
  breakpoints: {
    '992': {
      slidesPerView: 4,
      spaceBetween: 32,
    },
  },
});
function pauseSlider() {
  // 暫停輪播
  swiper.value!.$el.swiper.autoplay.stop();
}
function resumeSlider() {
  // 開始輪播
  swiper.value!.$el.swiper.autoplay.start();
}
</script>
<style lang="scss" scoped>
@import 'swiper/css';
@import 'swiper/css/navigation';
@import 'swiper/css/pagination';
.banner-content {
  position: absolute;
  background: rgba($color: #fff, $alpha: 0.5);
  top: 24px;
  left: 24px;
  right: 24px;
  @include lg {
    top: 15%;
    left: 10%;
    width: 40%;
    right: auto;
  }
}
.home-nav {
  width: 100%;
  &:hover {
    .nav-name {
      top: 0;
    }
  }
  @include lg {
    width: 33%;
    clip-path: var(--clip-path-diamond);
  }
}
.nav-link {
  position: relative;
  display: block;
  width: 100%;
  background-size: cover;
  background-position: center;
  height: 200px;
  @include lg {
    height: 375px;
  }
}
.nav-name {
  position: absolute;
  top: 85%;
  bottom: 0;
  left: 0;
  right: 0;
  transition: top 0.5s;
}
.products {
  --swiper-wrapper-transition-timing-function: linear;
  .swiper-slide:hover{
    transform: translateY(-5px);
  }
}
</style>
