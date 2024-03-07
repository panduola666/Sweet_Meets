import { defineStore } from 'pinia'
import type { addCartDate, cartDate, cartsList } from '@/interface/cart'

const cartStore = defineStore('cartStore', () => {
  const { apiPath } = useRuntimeConfig().public

  const cartsData = ref<cartDate>({
    carts: [],
    final_total: 0,
    total: 0,
  })
  const carts = ref<cartsList[]>([])

  const frontAPI = {
    // 加入購物車
    async addCart(data: addCartDate) {
      await getFetchData({
        url: `/api/${apiPath}/cart`,
        method: 'POST',
        params: { data },
      })
    },
    // 查看購物車
    async checkCart() {
      const res: any = await getFetchData({
        url: `/api/${apiPath}/cart`,
        method: 'GET',
      })

      if (res && res.success) {
        cartsData.value = res.data as cartDate
        carts.value = res.data.carts as cartsList[]
      }
    },
    async clearCart() {
      await getFetchData({
        url: `/api/${apiPath}/carts`,
        method: 'DELETE',
      })
    },
  }

  return {
    cartsData,
    carts,
    ...frontAPI,
  }
})

export default cartStore
