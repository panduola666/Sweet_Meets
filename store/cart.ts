import { defineStore } from 'pinia'

const cartStore = defineStore('cartStore',() => {
  const { apiPath } = useRuntimeConfig().public;
  const frontAPI = {
    async addCart (data) {
      const res: any = await getFetchData({
        url: `/api/${apiPath}/cart`,
        method: 'POST',
        params: { data }
      });
      console.log(res)
    },
    async clearCart () {
      const res: any = await getFetchData({
        url: `/api/${apiPath}/carts`,
        method: 'DELETE',
      });
      console.log(res)
    },
  }

 
 return {
  ...frontAPI
 }
})

export default cartStore