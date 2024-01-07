<template>
  <div class="d-flex align-items-center mb-5 mb-lg-7">
    <template v-for="(item, index) in props.steps" :key="item">
      <span class="step-box fs-lg-5 py-2 py-lg-3" :class="{active: props.currStep === index}">
        <span class="d-none d-lg-block">{{ item }}</span>
        <span class="d-lg-none">{{ index + 1 }}</span>
      </span>
      <span class="step-box fs-lg-5"></span>
    </template>
  </div>
</template>
<script setup lang="ts">
const props = defineProps(['steps', 'currStep'])


</script>
<style lang="scss" scoped>
.step-box{
  align-items: center;
  flex-grow: 1;
  text-align: center;
  border: 2px solid $secondary;
  color: $secondary;
  font-weight: 700;
  
  // &:nth-child(2n-1) {
  //   border-radius: 50%;
  //   @include lg{
  //     border-radius: none;
  //   }
  // }

  &:last-child{
    display: none;
  }
  &.active{
    background: $secondary;
    span{
      color: $white;
    }
  }
}
</style>