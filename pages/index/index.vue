<template>
  <div>
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
                :style="{backgroundImage: `url(${link.imgUrl})`}"
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
  
      <!-- 快速預約 -->
      <div class="order bg-primary py-6 py-lg-7">
        <h2 class="h1 fw-bold text-center mb-6">快速預約</h2>
        <div class="products" @mouseover="pauseSlider" @mouseleave="resumeSlider">
          <!-- <Swiper
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
                  <h3 class="fs-3 m-0">甜點名稱</h3>
                </div>
            </SwiperSlide>
          </Swiper> -->
        </div>
      </div>
      <product-modal :product="product"/>
  
      <!-- 近期活動 -->
        <div class="d-flex bg-secondary">
          <div class="w-50 d-none d-lg-block">
            <img src="../../assets/img/home/activiryBanner.png" alt="" class="w-100 h-100 object-fit-cover opacity-75">
          </div>
          <div class="flex-grow-1">
            <article class="border border-2 text-white px-2 px-lg-4 pt-4 pb-9 mx-3 mx-lg-8 my-8">
              <h2 class="fs-1 fw-bold  text-center mb-6 mb-lg-7">近期活動</h2>
              <ul class="d-flex flex-column gap-6 gap-lg-7">
                <li class="text-white pb-6 border-bottom border-2 default" v-for="i in 3" :key="i">
                  <h4 class="h2">12月甜點聯誼會</h4>
                  <p class="text-white fs-4 m-0 d-flex justify-content-between align-items-end">
                    活動時間: 2023/12/23 (六) 20:00
                    <NuxtLink to="" class="text-white fs-6 activity-link">詳情 >></NuxtLink>
                  </p>
                </li>
              </ul>
            </article>
          </div>
        </div>
  
        <!-- 操作步驟 -->
        <div class="container py-8 py-lg-9">
        <h2 class="h1 fw-bold text-center mb-6">操作步驟</h2>
          <div class="row justify-content-center gap-6 gap-lg-0">
            <div class="col-12 col-lg-4 d-flex flex-column align-items-center default" v-for="step in steps" :key="step.name">
              <img :src="step.imgUrl" :alt="step.name" class="img-fluid">
              <p class="fs-2 fw-bold m-0">{{ step.name }}</p>
            </div>
          </div>
        </div>
  
  
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import type { homeNav, stepsType } from '@/interface/home';
import diyImg from '@/assets/img/home/diy.png';
import activityImg from '@/assets/img/home/activity.png';
import placeImg from '@/assets/img/home/place.png';
import step1Img from '@/assets/img/home/step1.png';
import step2Img from '@/assets/img/home/step2.png';
import step3Img from '@/assets/img/home/step3.png';
import step4Img from '@/assets/img/home/step4.png';
import step5Img from '@/assets/img/home/step5.png';

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
  speed: 3000,
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

const steps = ref<stepsType[]>([
  {
    name: '1. 選擇甜點',
    imgUrl: step1Img,
  },
  {
    name: '2. 觀看製作流程',
    imgUrl: step2Img,
  },
  {
    name: '3. 選取用品',
    imgUrl: step3Img,
  },
  {
    name: '4. 進行製作',
    imgUrl: step4Img,
  },
  {
    name: '5. 清洗用具並歸還',
    imgUrl: step5Img,
  }
])
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
.activity-link:hover{
  text-decoration: underline;
  text-underline-offset: 4px;
}
</style>
