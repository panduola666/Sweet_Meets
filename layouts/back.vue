<template>
  <div class="backLayout d-flex flex-column">
    <header class="bg-white bg-opacity-50 sticky-top">
      <nav
        class="d-flex align-items-center justify-content-between px-md-8 px-4 blur boxShadow"
      >
        <!-- <img
          src="../assets/img/Logo.png"
          alt="相遇甜點"
          height="64"
          class="py-2"
        /> -->
        <ul class="nav h5 gap-6 d-none d-md-flex">
          <li v-for="item in headerList" :key="item.route" class="nav-item">
            <NuxtLink
              class="pcNav nav-link fw-bold py-4 px-2 position-relative"
              :class="{ active: item.route === route.path }"
              :to="item.route"
              >{{ item.name }}</NuxtLink
            >
          </li>
        </ul>
        <span
          class="material-symbols-outlined fs-1 d-md-none"
          :class="{ 'bg-primary rounded-circle': false }"
          @click="menuOpen = !menuOpen"
        >
          menu
        </span>

        <div class="py-3">
          <!-- <span class="fw-bold me-4 d-none d-md-inline-block"
            >你好, admin001</span
          > -->
          <button
            type="button"
            class="btn btn-outline-secondary px-5"
            @click="userStore.logout"
          >
            登出
          </button>
        </div>
      </nav>
      <ul
        v-if="menuOpen"
        class="nav flex-column d-md-none h4 text-center py-6 position-absolute top-100 w-100 bg-white bg-opacity-50 blur"
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

    <main class="mt-4 mt-md-8 flex-grow-1 container-fluid px-md-8 px-4">
      <nav v-if="pageName" aria-label="breadcrumb">
        <ol class="breadcrumb fs-5 fw-bold mb-0">
          <li class="breadcrumb-item">{{ pageName }}</li>
          <li
            v-for="path in props.breadPath"
            :key="path"
            class="breadcrumb-item active"
            aria-current="page"
          >
            {{ path }}
          </li>
        </ol>
      </nav>

      <ChangeLang />
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import type { headerLink } from '../interface/header'
import User from '@/store/user'

const userStore = User()
const route = useRoute()
const menuOpen = ref<boolean>(false)
const pageName = ref<string>('')
const props = withDefaults(defineProps<{ breadPath?: string[] }>(), {
  breadPath: () => [],
})

const currRoute = computed(() =>
  headerList.value.find((list) => list.route === route.path),
)
onMounted(async () => {
  await nextTick(() => {
    userStore.checkLogin()
    pageName.value = currRoute.value ? currRoute.value.name : ''
  })
})

const headerList = ref<headerLink[]>([
  {
    route: '/admin/products',
    name: computed(() => i18nT('route.diy')),
  },
  {
    route: '/admin/activities',
    name: computed(() => i18nT('route.adminActivity')),
  },
  {
    route: '/admin/orders',
    name: computed(() => i18nT('route.adminOrder')),
  },
])
</script>

<style lang="scss" scoped>
.backLayout {
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
      width: 30px;
      height: 30px;
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
</style>
