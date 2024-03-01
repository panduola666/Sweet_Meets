import { defineStore } from 'pinia';
import type { paginationType } from '../interface/product';

const couponStore = defineStore('couponStore', () => {
  const { apiPath } = useRuntimeConfig().public;

  const coupons = ref([])
  const pagination = ref<paginationType>({
    current_page: 0,
    has_next: false,
    has_pre: false,
    total_pages: 0,
  });

  const adminAPI = {
    // 後台預約報到
    async checkIn(data) {
      const res: any = await getFetchData({
        url: `/api/${apiPath}/admin/coupon`,
        method: 'POST',
        params: { data },
      });

      useSwal({
        title: '報到成功',
        showConfirmButton: false,
        timer: 3000,
      });
    },
    // 後台已報到名單
    async adminGet(page: number|string = 1) {
      const res: any = await getFetchData({
        url: `/api/${apiPath}/admin/coupons?page=${page}`,
        method: 'GET',
      });
      if (res && res.success) {
        coupons.value = res.coupons;
        pagination.value = res.pagination;
      }
    },
  };


  return {
    coupons,
    pagination,
    ...adminAPI,
  };
});

export default couponStore;
