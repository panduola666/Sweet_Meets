import { defineStore } from 'pinia';
import type { adminGet, paginationType } from '../interface/product';

const productStore = defineStore('productStore', () => {
  const { apiPath } = useRuntimeConfig().public;
  const products = ref([]);
  const product = ref({})
  const pagination = ref<paginationType>({
    current_page: 0,
    has_next: false,
    has_pre: false,
    total_pages: 0,
  });

  // 後台取得產品列表
  async function adminGet(data: adminGet) {
    const res: any = await getFetchData({
      url: `/api/${apiPath}/admin/products?category=${data.category}&page=${data.page}`,
      method: 'GET',
    });
    if (res && res.success) {
      products.value = res.products;
      pagination.value = res.pagination;
    }
  }

  // 後台刪除產品
  async function adminDel(id: string) {
    const res: any = await getFetchData({
      url: `/api/${apiPath}/admin/product/${id}`,
      method: 'DELETE',
    });
    console.log(res.message);

    useSwal({
      title: res.message,
      showConfirmButton: false,
      timer: 3000,
    });
    console.log(res);
  }

  return {
    products,
    pagination,
    adminGet,
    adminDel,
    product
  };
});

export default productStore;
