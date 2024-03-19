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
          <h1 class="fs-2 fw-bold mb-6 mb-lg-7">
            {{ $t('home.title1') }}<br />{{ $t('home.title2') }}
          </h1>
          <NuxtLink to="/diy" class="btn btn-secondary fs-lg-3 w-100 py-3">
            {{ $t('home.start') }}
          </NuxtLink>
        </section>
      </div>

      <nav class="container my-lg-9 my-8">
        <div class="d-flex align-items-center gap-9">
          <div class="d-none d-lg-block">
            <p
              class="nav-tab text-center p-7 bg-white bg-opacity-50 blur boxShadow rounded-4"
            >
              <img
                src="../../assets/svg/homeTag.svg"
                alt="相遇甜點"
                width="80"
              />
            </p>
          </div>
          <div
            class="d-flex flex-column flex-lg-row justify-content-between gap-6 gap-lg-0 flex-grow-1"
          >
            <div
              v-for="link in homeNav"
              :key="link.route"
              class="home-nav d-flex fw-bold"
            >
              <NuxtLink
                :to="link.route"
                class="nav-link"
                :style="{ backgroundImage: `url(${link.imgUrl})` }"
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
      <div class="order bg-secondary bg-opacity-10 py-6 py-lg-7">
        <h2 class="h1 fw-bold text-center mb-6">{{ $t('home.quickOrder') }}</h2>
        <div
          class="products"
          @mouseover="pauseSlider"
          @mouseleave="resumeSlider"
        >
          <Swiper v-if="productList.length" ref="swiper" v-bind="swiperConfig">
            <SwiperSlide
              v-for="product in productList"
              :key="product.id"
              @click="productTemp = product"
            >
              <div class="text-center pointer">
                <img
                  :src="product.imageUrl"
                  height="375"
                  :alt="product.title"
                  class="w-100 object-fit-cover mb-6"
                />
                <h3 class="fs-3 m-0">{{ product.title }}</h3>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <ProductModal :product="productTemp" @close="resetTemp" />

      <!-- 近期活動 -->
      <div class="d-flex bg-secondary">
        <div class="w-50 d-none d-lg-block">
          <img
            src="../../assets/img/home/activiryBanner.png"
            alt=""
            class="w-100 h-100 object-fit-cover opacity-75"
          />
        </div>
        <div class="flex-grow-1">
          <article
            class="border border-2 text-white px-2 px-lg-4 pt-4 pb-9 mx-3 mx-lg-8 my-8"
          >
            <h2 class="fs-1 fw-bold text-center mb-6 mb-lg-7">
              {{ $t('home.recentActivity') }}
            </h2>
            <ul class="d-flex flex-column gap-6 gap-lg-7">
              <li
                v-for="activity in activitiesList.slice(0, 3)"
                :key="activity.id"
                class="text-white pb-6 border-bottom border-2 default"
              >
                <h4 class="h2">{{ activity.title }}</h4>
                <p
                  class="text-white fs-4 m-0 d-flex justify-content-between align-items-end"
                >
                  {{ $t('activity.time') }}: {{ activity.description }}
                  <NuxtLink
                    :to="`/activity?id=${activity.id}`"
                    class="text-white fs-6 activity-link pointer"
                    >{{ $t('common.detail') }} >></NuxtLink
                  >
                </p>
              </li>
            </ul>
          </article>
        </div>
      </div>

      <!-- 操作步驟 -->
      <div class="container py-8 py-lg-9">
        <h2 class="h1 fw-bold text-center mb-6">{{ $t('home.stepTitle') }}</h2>
        <div class="row justify-content-center gap-6 gap-lg-0">
          <div
            v-for="step in steps"
            :key="step.name"
            class="col-12 col-lg-4 d-flex flex-column align-items-center default"
          >
            <img :src="step.imgUrl" :alt="step.name" class="img-fluid" />
            <p class="fs-2 fw-bold m-0">{{ step.name }}</p>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import type { homeNav as homeNavType, stepsType } from '@/interface/home'
import type { adminPost } from '@/interface/product'
import diyImg from '@/assets/img/home/diy.png'
import activityImg from '@/assets/img/home/activity.png'
import placeImg from '@/assets/img/home/place.png'
import step1Img from '@/assets/img/home/step1.png'
import step2Img from '@/assets/img/home/step2.png'
import step3Img from '@/assets/img/home/step3.png'
import step4Img from '@/assets/img/home/step4.png'
import step5Img from '@/assets/img/home/step5.png'
import Products from '@/store/products'
import Article from '@/store/article'

const productStore = Products()
const ArticleStore = Article()
const swiper = ref()

const productTemp = ref<adminPost>({
  title: '',
  category: '',
  origin_price: 0,
  price: 0,
  unit: '',
  description: '',
  finalTime: 0,
  content: [],
  saveMethods: [],
  imageUrl: '',
  imagesUrl: [],
  is_enabled: 0,
  saveMode: 0,
})
const productList = computed(() => productStore.products || [])
const activitiesList = computed(() => ArticleStore.articles || [])
onMounted(() => {
  nextTick(async () => {
    await productStore.productsGet()
    await ArticleStore.articlesGet(1)
    resumeSlider()
  })
})

const homeNav = ref<homeNavType[]>([
  {
    route: '/diy',
    name: computed(() => i18nT('route.diy')),
    imgUrl: diyImg,
  },
  {
    route: '/activity',
    name: computed(() => i18nT('route.activity')),
    imgUrl: activityImg,
  },
  {
    route: '/place',
    name: computed(() => i18nT('route.place')),
    imgUrl: placeImg,
  },
])

const swiperConfig = ref({
  observer: true,
  modules: [SwiperAutoplay],
  speed: 5000,
  loop: true,
  autoplay: {
    delay: 0,
    disableOnInteraction: true,
  },
  spaceBetween: 16,
  breakpoints: {
    '992': {
      speed: 3000,
      slidesPerView: 4,
      spaceBetween: 32,
    },
  },
})

function resetTemp() {
  productTemp.value = {
    title: '',
    category: '',
    origin_price: 0,
    price: 0,
    unit: '',
    description: '',
    finalTime: 0,
    content: [],
    saveMethods: [],
    imageUrl: '',
    imagesUrl: [],
    is_enabled: 0,
    saveMode: 0,
  }
}

function pauseSlider() {
  // 暫停輪播
  nextTick(() => swiper.value && swiper.value!.$el.swiper.autoplay.stop())
}
function resumeSlider() {
  // 開始輪播
  nextTick(() => swiper.value && swiper.value!.$el.swiper.autoplay.start())
}

const steps = ref<stepsType[]>([
  {
    name: computed(() => i18nT('home.step1')),
    imgUrl: step1Img,
  },
  {
    name: computed(() => i18nT('home.step2')),
    imgUrl: step2Img,
  },
  {
    name: computed(() => i18nT('home.step3')),
    imgUrl: step3Img,
  },
  {
    name: computed(() => i18nT('home.step4')),
    imgUrl: step4Img,
  },
  {
    name: computed(() => i18nT('home.step5')),
    imgUrl: step5Img,
  },
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
    top: 50%;
    left: 30%;
    width: 40%;
    transform: translate(-50%, -50%);
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
  .swiper-slide:hover {
    transform: translateY(-5px);
  }
}
.activity-link:hover {
  text-decoration: underline;
  text-underline-offset: 4px;
}
</style>
