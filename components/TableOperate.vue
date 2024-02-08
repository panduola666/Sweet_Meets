<template>
  <div class="d-flex align-items-center justify-content-center gap-2">
    <div class="pointer p-2 border d-flex align-items-center bg-white position-relative h-100 search">
      <span class="position-absolute tip search-tip">詳情</span>
      <img
        src="@/assets/icons/search.svg"
        alt="search"
        width="20"
        height="20"
        style="margin-bottom: 0.125em;"
      />
    </div>
    <div class="position-relative edit">
      <span class="position-absolute tip edit-tip">編輯</span>
      <NuxtIcon
        name="edit"
        class="pointer p-2 border operate-btn d-flex align-items-center bg-white"
      />
    </div>
    <div class="position-relative delete">
      <span class="position-absolute tip delete-tip">刪除</span>
      <NuxtIcon
        name="delete"
        class="pointer p-2 border operate-btn d-flex align-items-center bg-white"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.operate-btn{
   svg {
    width: 20px;
    height: 20px;
  }
}
.tip{
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
.search:hover .search-tip{
  display: block;
}
.edit:hover .edit-tip{
  display: block;
}
.delete:hover .delete-tip{
  display: block;
}
</style>
