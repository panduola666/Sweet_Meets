<template>
  <NuxtLayout name="back">
    <h1 class="h4 fw-bold mb-5">修改品項 - 奧利奧蛋糕</h1>
    <VeeForm @submit="submit" :validation-schema="schema">
      <div class="row">
        <div class="col-4">
          <!-- 產品圖片 -->
          <div class="mb-1">
            <label for="productImg" class="form-label fw-bold">產品圖片</label>
            <VeeField
              class="form-control"
              id="productImg"
              name="產品圖片"
              type="text"
              placeholder="請輸入圖片網址"
              v-model="form.imageUrl"
            />
            <VeeErrorMessage name="產品圖片" class="text-danger" />
          </div>
          <img :src="form.imageUrl" :alt="form.title" class="imageUrl mb-1">
          <div class="position-relative mb-3">
            <label for="update" class="form-label position-relative z-1 btn btn-secondary w-100 fs-5">上傳圖片</label>
            <input class="form-control position-absolute opacity-0 top-0 start-0" type="file" name="" id="update">
          </div>
          <p class="fw-bold">更多圖片</p>
          <div class="row g-3 mb-3">
            <div class="col-6 position-relative" v-for="(i, index) in 5" :key="index">
              <button type="button" class="btn btn-close position-absolute top-5 end-5 bg-white p-2 rounded-circle"></button>
              <img src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29va2llfGVufDB8fDB8fHww" alt="" class="object-fit-cover w-100" height="150" />
            </div>
          </div>
          <div class="position-relative mb-3">
            <label for="update" class="form-label position-relative z-1 btn btn-outline-secondary w-100">上傳圖片</label>
            <input class="form-control position-absolute opacity-0 top-0 start-0" type="file" name="" id="update">
          </div>
        </div>

        <div class="col"></div>
      </div>
      
      <div class="d-flex justify-content-end gap-3">
        <button type="reset" class="btn btn-lg btn-primary">取消</button>
        <button type="submit" class="btn btn-lg btn-secondary">確認</button>
      </div>
    </VeeForm>
  </NuxtLayout>
</template>
<script setup lang="ts">
const route = useRoute();

console.log(route);

const form = ref({
  title: '',
  category: '',
  origin_price: 0,
  price: 0,
  unit: '人',
  description: '',
  content: [],
  saveMethods: [],
  imageUrl:
    'https://plus.unsplash.com/premium_photo-1664283734034-9eac59c2bc7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29va2llfGVufDB8fDB8fHww',
  imagesUrl: [],
  is_enabled: 1,
});

const schema = {
  產品圖片: 'required',
};
function submit(value: any, { resetForm }: any) {
  console.log('送出表單');

  resetForm();
}
</script>
<style lang="scss" scoped>
.imageUrl{
  max-height: 300px;
  width: 100%;
  object-fit: cover;
}
</style>