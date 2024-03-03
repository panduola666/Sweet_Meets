import { defineStore } from 'pinia';
import type { paginationType } from '../interface/product';
import type { couponData } from '@/interface/coupon';

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
    async checkIn(data: couponData) {
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
    // 後台確認付款
    async adminPaid(data: couponData) {
      const res: any = await getFetchData({
        url: `/api/${apiPath}/admin/coupon/${data.id}`,
        method: 'PUT',
        params: { data },
      });

      useSwal({
        title: '付款成功',
        showConfirmButton: false,
        timer: 3000,
      });
    },
    async adminLeave(id: string) {
      const res: any = await getFetchData({
        url: `/api/${apiPath}/admin/coupon/${id}`,
        method: 'DELETE',
      });
      useSwal({
        title: '確認離場',
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };


  return {
    coupons,
    pagination,
    ...adminAPI,
  };
});

export default couponStore;
