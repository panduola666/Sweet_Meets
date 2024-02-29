import { defineStore } from 'pinia';
import type { postOrder, viewUserOrder } from '@/interface/order';
import type { paginationType } from '../interface/product';

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
      productData: {
        title: '',
        category: '',
        origin_price: 0,
        price: 0,
        unit: '',
        description: '',
        finalTime: 0,
        content: [],
        saveMethods: [],
        imageUrl: '',
        imagesUrl: [],
        is_enabled: 0,
        saveMode: 0,
      },
      totalPerson: 0,
      totalTime: 0,
      productId: '',
    },
  });

  const placeOrder = ref<postOrder>({
    message: '',
    user: {
      name: '',
      email: '',
      tel: '',
      address: '',
      birth: '',
      productData: {
        title: '',
        category: '',
        origin_price: 0,
        price: 0,
        unit: '',
        description: '',
        finalTime: 0,
        content: [],
        saveMethods: [],
        imageUrl: '',
        imagesUrl: [],
        is_enabled: 0,
        saveMode: 0,
      },
      orderDate: '',
      totalPerson: 0,
      totalTime: 0,
      productId: '',
    },
  });

  const orders = ref([])
  const pagination = ref<paginationType>({
    current_page: 0,
    has_next: false,
    has_pre: false,
    total_pages: 0,
  });

  const adminAPI = {
    // 後台取得預約訂單
    async adminGet(page: number|string = 1) {
      const res: any = await getFetchData({
        url: `/api/${apiPath}/admin/orders?page=${page}`,
        method: 'GET',
      });
      if (res && res.success) {
        orders.value = res.orders;
        pagination.value = res.pagination;
      }
    },
    // 後台取消預約
    async adminDel(id: string) {
      const res: any = await getFetchData({
        url: `/api/${apiPath}/admin/order/${id}`,
        method: 'DELETE',
      });
  
      useSwal({
        title: '已取消預約',
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

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
        resetPlaceOrder();
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
      return res;
    },
  };

  function resetPlaceOrder() {
    placeOrder.value = {
      message: '',
      user: {
        name: '',
        email: '',
        tel: '',
        address: '',
        birth: '',
        productData: {
          title: '',
          category: '',
          origin_price: 0,
          price: 0,
          unit: '',
          description: '',
          finalTime: 0,
          content: [],
          saveMethods: [],
          imageUrl: '',
          imagesUrl: [],
          is_enabled: 0,
          saveMode: 0,
        },
        orderDate: '',
        totalPerson: 0,
        totalTime: 0,
        productId: '',
      },
    };
  }

  return {
    userOrder,
    placeOrder,
    orders,
    pagination,
    resetPlaceOrder,
    ...frontAPI,
    ...adminAPI,
  };
});

export default orderStore;
