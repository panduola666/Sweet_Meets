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
      <h2 class="h1 fw-bold text-center">快速預約</h2>
      <div @mouseover="pauseSlider"
        @mouseleave="resumeSlider">
        <Swiper
          ref="swiper"
          :modules="[SwiperAutoplay]"
          :space-between="16"
          :autoplay="{
            delay: 500,
            disableOnInteraction: false,
          }"
          :speed="2000"
          :loop="true"
          :breakpoints="{
            '992': {
              slidesPerView: 4,
              spaceBetween: 64,
            },
          }"
        >
          <SwiperSlide class="bg-white">Slide 1</SwiperSlide>
          <SwiperSlide class="bg-white">Slide 2</SwiperSlide>
          <SwiperSlide class="bg-white">Slide 3</SwiperSlide>
          <SwiperSlide class="bg-white">Slide 4</SwiperSlide>
          <SwiperSlide class="bg-secondary">Slide 5</SwiperSlide>
          <SwiperSlide class="bg-secondary">Slide 6</SwiperSlide>
          <SwiperSlide class="bg-secondary">Slide 7</SwiperSlide>
          <SwiperSlide class="bg-secondary">Slide 8</SwiperSlide>
          <SwiperSlide class="bg-secondary">Slide 9</SwiperSlide>
        </Swiper>
      </div>
    </div>
  </NuxtLayout>
</template>
<script setup lang="ts">
import type { homeNav } from '@/interface/home';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
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

const swiper = ref<{[key: string]: any}|null>(null);
function pauseSlider() {
  // 暫停輪播
  swiper.value!.$el.swiper.autoplay.stop()
  
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
    clip-path: polygon(10% 0, 100% 0%, 90% 100%, 0% 100%);
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
</style>
