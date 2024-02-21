import { defineStore } from 'pinia'

const loadingStore = defineStore('loadingStore',() => {
 const isLoading = ref<boolean>(false)

 function changeLoading(boolean: boolean) {
  isLoading.value = boolean
 }
 return {
  isLoading,
  changeLoading
 }
})

export default loadingStore