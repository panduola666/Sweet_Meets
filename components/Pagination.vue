<template>
  <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between">
    <p class="mb-0 fs-5">當前為第 {{ pagination.current_page }} 頁, 共 {{ pagination.total_pages }} 頁</p>
    <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-end justify-content-md-start">
      <li class="page-item" :class="{disabled: !pagination.has_pre}"><button class="page-link" @click="changePage(-1)">&lt;</button></li>
      <!-- <li class="page-item"><button type="button" class="page-link">{{ pagination.current_page }}</button></li> -->
      <li class="page-item" :class="{disabled: !pagination.has_next}"><button class="page-link" @click="changePage(1)">&gt;</button></li>
    </ul>
  </nav>
  </div>
</template>
<script setup lang="ts">
const { pagination } = defineProps(['pagination']);

const emit = defineEmits(['click']);
function changePage (page: string|number):void {
  emit('click', Number(pagination.current_page) + Number(page));
}


</script>