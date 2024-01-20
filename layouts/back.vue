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
          <li class="nav-item" v-for="item in headerList" :key="item.route">
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
          <span class="fw-bold me-4 d-none d-md-inline-block"
            >你好, admin001</span
          >
          <button type="button" class="btn btn-outline-secondary px-5" @click="logout">
            登出
          </button>
        </div>
      </nav>
      <ul
        v-if="menuOpen"
        class="nav flex-column d-md-none h4 text-center py-6 position-absolute top-100 w-100 bg-white bg-opacity-50 blur"
        style="box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 6px"
      >
        <li class="nav-item" v-for="item in headerList" :key="item.route">
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
      <nav aria-label="breadcrumb" v-if="pageName">
        <ol class="breadcrumb fs-5 fw-bold mb-0">
          <li class="breadcrumb-item">{{ pageName }}</li>
          <li
            class="breadcrumb-item active"
            aria-current="page"
            v-for="path in props.breadPath"
            :key="path"
          >
            {{ path }}
          </li>
        </ol>
      </nav>
      <slot />
    </main>
  </div>
</template>
<script setup lang="ts">
import type { headerLink } from '../interface/header';
const route = useRoute();
const menuOpen = ref<boolean>(false);
const pageName = ref<string>('');
const props = withDefaults(defineProps<{ breadPath?: string[] }>(), {
  breadPath: () => [],
});

onMounted(async () => {
  await getFetchData({
    url: '/api/user/check',
    method: 'POST'
  })
  
  
  const currRoute = headerList.value.find(
    (list) => list.route === route.path
  ) as headerLink;
  pageName.value = currRoute ? currRoute.name : '';
});

const headerList = ref<headerLink[]>([
  {
    route: '/admin/products',
    name: 'DIY 課程',
  },
  {
    route: '/admin/activities',
    name: '活動管理',
  },
  {
    route: '/admin/orders',
    name: '預約管理',
  },
]);

// 登出
async function logout() {
  const token = useCookie('token')
  token.value = null
  const swal = await useSwal({
    title: '已登出',
    showConfirmButton: false,
    timer: 3000
  })
  if(swal.isDismissed as boolean) {
    useRouter().push('/')
  }
}
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
