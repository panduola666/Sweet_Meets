<template>
  <VeeForm @submit="submit" v-slot="{ meta, isSubmitting }">
   使用 rules 行內傳入規則
   <!-- 多個規則，用 | 做區隔 -->
   <div>
     <VeeField name="email" type="email" rules="required|email" />
     <VeeErrorMessage name="email" />
   </div>
   <div>
     <VeeField name="password" type="password" :rules="checkPassword" />
     <VeeErrorMessage name="password" />
   </div>
     
     <!-- meta.valid 屬性來檢查是否驗證成功 -->
     <button type="submit" :disabled="!meta.valid">meta.valid 僅驗證成功才可按</button>
 
     <!-- isSubmitting -->
     <button type="submit" :disabled="isSubmitting">
       <span class="spinner" v-show="isSubmitting"></span>
       isSubmitting 確認 submit API loading
     </button>
   </VeeForm>
 
   <!-- schema 統一管理 -->
   <VeeForm @submit="submit" :validation-schema="schema" v-slot="{ resetForm }">
     使用 validation-schema 統一制定規則
     <div>
       <VeeField name="schema信箱" type="email" />
       <VeeErrorMessage name="schema信箱" />
     </div>
     <div>
       <VeeField name="schema密碼" type="password" />
       <VeeErrorMessage name="schema密碼" />
     </div>
     
     <VeeField name="drink" type="radio" value="" /> None
     <VeeField name="drink" type="radio" value="Tea" /> Tea
     <VeeField name="drink" type="radio" value="Coffee" /> Coffee
     <VeeErrorMessage name="drink" />
 
 
 
     <button type="submit" @click="schemaSubmit">submit</button>
     <button type="button" @click="resetForm">清除表單</button>
    <button type="reset">清除表單</button>
   </VeeForm>
 </template>
 <script setup lang="ts">
  // 自定義驗證
  const checkPassword = (value:any) => {
   // 當前綁定 rules 的 value 自訂驗證
   console.log(value);
   
   if (!value) {
     return false;
   }
   return true;
 }
 const submit = (value: any, { resetForm }) => {
   return new Promise(resolve => {
     setTimeout(() => {
       console.log('sumbit', value);
       resetForm()
       resolve();
     }, 2000);
   });
 };


 const schema = {
   // 根據 input name 分辨
   schema信箱: 'required|email',
   schema密碼: 'required|min:8',
   // drink: (value) => {
   //   if (value) {
   //     return true;
   //   }
   //   return '必須選一個';
   // },
   drink: 'required'
 };
 const schemaSubmit = (value:any, { resetForm }) => {
   console.log(value);
   resetForm()
 }

 </script>
 