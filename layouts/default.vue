<template>
  <div class="frontLayout d-flex flex-column">
    <header class="bg-white bg-opacity-50 sticky-top">
      <nav
        class="d-flex align-items-center justify-content-between px-lg-9 px-3 blur"
        :class="{ boxShadow: !menuOpen }"
      >
        <NuxtLink to="/">
          <img
            src="../assets/img/Logo.png"
            alt="相遇甜點"
            height="64"
            class="py-2"
          />
        </NuxtLink>

        <ul class="nav h4 gap-6 d-none d-lg-flex">
          <li v-for="item in headerList" :key="item.route" class="nav-item">
            <NuxtLink
              class="pcNav nav-link fw-bold py-6 px-2 position-relative"
              :class="{ active: item.route === route.path }"
              :to="item.route"
              >{{ item.name }}</NuxtLink
            >
          </li>
        </ul>
        <span
          class="material-symbols-outlined fs-1 d-lg-none"
          :class="{ 'bg-primary rounded-circle': false }"
          @click="menuOpen = !menuOpen"
        >
          menu
        </span>
      </nav>
      <ul
        v-if="menuOpen"
        class="nav flex-column d-lg-none h4 text-center py-6 position-absolute top-100 w-100 bg-white bg-opacity-50 blur"
        style="box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 6px"
      >
        <li v-for="item in headerList" :key="item.route" class="nav-item">
          <NuxtLink
            class="nav-link fw-bold mx-3"
            :class="{ 'bg-primary': item.route === route.path }"
            :to="item.route"
            >{{ item.name }}</NuxtLink
          >
        </li>
      </ul>
    </header>

    <main class="mt-4 mt-lg-8 flex-grow-1">
      <ChangeLang />
      <slot />
    </main>

    <footer class="position-relative">
      <div class="footer">
        <img
          src="../assets/img/cake.png"
          alt="cake"
          class="cake d-none d-lg-block"
        />
      </div>
      <div class="footer-nav">
        <div class="py-8 bg-white bg-opacity-50 blur boxShadow fw-bold">
          <ul
            class="d-flex flex-column flex-lg-row justify-content-between justify-content-lg-around gap-2 fs-5 mb-4 px-6"
          >
            <li
              v-for="item in headerList"
              :key="item.route"
              class="text-center"
            >
              <NuxtLink :to="item.route">{{ item.name }}</NuxtLink>
            </li>
          </ul>
          <address class="fs-4 text-center mb-0 px-6">
            {{ $t('common.address') }}
          </address>
        </div>
      </div>
      <div class="bg-footer"></div>
      <AdminLogin />
    </footer>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import type { headerLink } from '../interface/header'
const route = useRoute()

const headerList = ref<headerLink[]>([
  {
    route: '/',
    name: computed(() => i18nT('route.home')),
  },
  {
    route: '/diy',
    name: computed(() => i18nT('route.diy')),
  },
  {
    route: '/activity',
    name: computed(() => i18nT('route.activity')),
  },
  {
    route: '/place',
    name: computed(() => i18nT('route.place')),
  },
])

const menuOpen = ref<boolean>(false)
</script>
<style scoped lang="scss">
.frontLayout {
  background-color: rgb(247, 214, 224, 0.3);
  min-height: 100dvh;
}
.pcNav {
  border-bottom: 4px solid transparent;

  &.active {
    border-bottom: 4px solid $secondary;
  }
  &:hover {
    &:hover::before {
      content: '';
      width: 60px;
      height: 60px;
      position: absolute;
      background: $primary;
      border-radius: 50%;
      z-index: -1;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
.footer {
  position: relative;
  background: no-repeat top;
  background-size: cover;
  background-image: url('../assets/svg/footer-sm.svg');
  height: 35rem;
  @include lg {
    height: 27rem;
    background-image: url('../assets/svg/footer.svg');
  }
}
.footer-nav {
  position: absolute;
  bottom: 5%;
  right: 12px;
  left: 12px;
  @include lg {
    right: auto;
    left: 50%;
    transform: translateX(-50%);
    width: 50%;
    max-width: 650px;
  }
}
.cake {
  position: absolute;
  width: 15vw;
  right: 5vw;
  top: 3%;
  transform: rotate(10deg);
}
</style>
