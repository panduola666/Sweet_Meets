import { defineStore } from 'pinia'

const orderStore = defineStore('orderStore',() => {
  const { apiPath } = useRuntimeConfig().public;

 const frontAPI = {
  async createOrder (data) {
    const res: any = await getFetchData({
      url: `/api/${apiPath}/order`,
      method: 'POST',
      params: { data }
    });
    console.log(res)
    useSwal({
      title: res.message,
      showConfirmButton: false,
      timer: 3000,
    })
  },
  async payOrder (id: string) {
    const res: any = await getFetchData({
      url: `/api/${apiPath}/pay/${id}`,
      method: 'POST',
      params: {}
    });
    console.log(res)
    useSwal({
      title: '支付成功',
      showConfirmButton: false,
      timer: 3000,
    })
  },

}
 return {
  ...frontAPI
 }
})

export default orderStore