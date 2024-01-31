import { defineStore } from 'pinia';
import type { adminGet, paginationType, adminPost } from '../interface/product';

const productStore = defineStore('productStore', () => {
  const { apiPath } = useRuntimeConfig().public;
  const products = ref<any[]>([]);
  const product = ref<object>({})
  const pagination = ref<paginationType>({
    current_page: 0,
    has_next: false,
    has_pre: false,
    total_pages: 0,
  });
  const categoryList = ['壽星優惠', '蛋糕', '餅乾', '塔派']

  const adminAPI = {
    // 後台取得產品列表
    async adminGet (data: adminGet) {
      const res: any = await getFetchData({
        url: `/api/${apiPath}/admin/products?category=${data.category}&page=${data.page}`,
        method: 'GET',
      });
      if (res && res.success) {
        products.value = res.products;
        pagination.value = res.pagination;
      }
    },
    // 後台刪除產品
    async adminDel(id: string) {
      const res: any = await getFetchData({
        url: `/api/${apiPath}/admin/product/${id}`,
        method: 'DELETE',
      });
  
      useSwal({
        title: res.message,
        showConfirmButton: false,
        timer: 3000,
      });
    },
    // 後台新增產品
    async adminAdd(data: adminPost) {
      const res: any = await getFetchData({
        url: `/api/${apiPath}/admin/product`,
        method: 'POST',
        params: { data }
      });
      useSwal({
        title: res.message,
        showConfirmButton: false,
        timer: 3000,
      })
    },
    // 後台編輯產品
    async adminPUT(id: string, data: adminPost) {
      const res: any = await getFetchData({
        url: `/api/${apiPath}/admin/product/${id}`,
        method: 'PUT',
        params: { data }
      });
      useSwal({
        title: res.message,
        showConfirmButton: false,
        timer: 3000,
      })
    }
  }

  return {
    products,
    pagination,
    product,
    categoryList,
    ...adminAPI
  };
});

export default productStore;
