import { defineStore } from 'pinia';
import type { postOrder, viewUserOrder } from '@/interface/order';

const orderStore = defineStore('orderStore', () => {
  const { apiPath } = useRuntimeConfig().public;
  const orderId = ref<string>('');
  const userOrder = ref<viewUserOrder>({
    create_at: 0,
    id: '',
    is_paid: false,
    products: {},
    total: 0,
    user: {
      name: '',
      email: '',
      tel: '',
      address: '',
      birth: '',
      orderDate: '',
      totalPerson: 0,
      totalTime: 0,
      productId: '',
    },
  });

  const frontAPI = {
    // 建立訂單
    async createOrder(data: postOrder) {
      const res: any = await getFetchData({
        url: `/api/${apiPath}/order`,
        method: 'POST',
        params: { data },
      });
      if (res && res.success) {
        orderId.value = res.orderId;
        localStorage.setItem('orderId', res.orderId);
        useSwal({
          title: '預約成功',
          showConfirmButton: false,
          timer: 3000,
        });
      }
    },
    // 查看訂單
    async viewOrder() {
      if (orderId.value) {
        const res: any = await getFetchData({
          url: `/api/${apiPath}/order/${orderId.value}`,
          method: 'GET',
        });
        if (res && res.success && res.order) {
          userOrder.value = res.order;
        } else {
          const swal = await useSwal({
            title: '查無此訂單',
            showConfirmButton: false,
            timer: 3000,
          });
          if (swal.isConfirmed) {
            useRouter().push(`/`);
          }
        }
      } else {
        const swal = await useSwal({
          title: '查無此訂單',
          showConfirmButton: false,
          timer: 3000,
        });
        if (swal.isConfirmed) {
          useRouter().push(`/`);
        }
      }
    },
    async payOrder(id: string) {
      const res: any = await getFetchData({
        url: `/api/${apiPath}/pay/${id}`,
        method: 'POST',
        params: {},
      });
      console.log(res);
      useSwal({
        title: '支付成功',
        showConfirmButton: false,
        timer: 3000,
      });
    },
  };
  return {
    userOrder,
    ...frontAPI,
  };
});

export default orderStore;
