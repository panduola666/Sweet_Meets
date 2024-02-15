<template>
  <div class="d-flex align-items-center justify-content-center gap-2">
    <div
      class="pointer p-2 border d-flex align-items-center bg-white position-relative h-100 search"
      data-bs-toggle="modal"
      data-bs-target="#detail"
    >
      <span class="position-absolute tip search-tip">詳情</span>
      <img
        src="@/assets/icons/search.svg"
        alt="search"
        width="20"
        height="20"
        style="margin-bottom: 0.125em"
      />
    </div>

    <NuxtLink to="/admin/activities/1" class="position-relative edit">
      <span class="position-absolute tip edit-tip">編輯</span>
      <NuxtIcon
        name="edit"
        class="pointer p-2 border operate-btn d-flex align-items-center bg-white"
      />
    </NuxtLink>

    <div class="position-relative delete">
      <span class="position-absolute tip delete-tip">刪除</span>
      <NuxtIcon
        name="delete"
        class="pointer p-2 border operate-btn d-flex align-items-center bg-white"
      />
    </div>
  </div>

  <!-- 詳情 Modal -->
  <div
    class="modal fade"
    id="detail"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">活動詳情</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="d-flex gap-3">
            <img
              src="https://media.istockphoto.com/id/1468486548/photo/vegan-walnut-tart.webp?b=1&s=170667a&w=0&k=20&c=c-0qCBulZgqq4FOb8wO5tAjwN2fLesro6fuDWOLSdgQ="
              alt=""
              class="cover"
            />
            <article class="text-start fs-6">
              <h2 class="fs-4 fw-bold">11 月甜點聯誼會</h2>
              <h3 class="fs-6 text-end mb-4">2023/11/11 (六) 20:00</h3>
              <div>
                <p>
                  還在苦惱平常太忙沒有時間交友嗎? 又或者是擔心交友軟體不靠普,
                  擔心自己受騙導致顧慮重重?
                </p>
                <p>
                  現在將推出同好聯誼活動,
                  無論是否是單身人士我們都很歡迎您的到來~
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Article from '@/store/article'

const ArticleStore = Article();

const { id } = defineProps(['id']);

function getDetail(id: string) {
  console.log('詳情')
}
</script>

<style lang="scss" scoped>
.cover {
  height: 300px;
  object-fit: cover;
  @include lg {
    clip-path: var(--clip-path-diamond);
    height: 500px;
  }
}
.operate-btn {
  svg {
    width: 20px;
    height: 20px;
  }
}
.tip {
  font-size: 12px;
  width: 100%;
  top: -25px;
  left: 0;
  right: 0;
  text-align: center;
  border: 1px solid #dee2e6;
  background: $white;
  border-radius: 3px;
  display: none;
}
.search:hover .search-tip {
  display: block;
}
.edit:hover .edit-tip {
  display: block;
}
.delete:hover .delete-tip {
  display: block;
}
</style>
