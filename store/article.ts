import { defineStore } from 'pinia';
import type { postArticle, paginationType } from '../interface/article'

const articleStore = defineStore('articleStore', () => {
  const { apiPath } = useRuntimeConfig().public;
  const articles = ref<any[]>([])
  const pagination = ref<paginationType>({
    current_page: 0,
    has_next: false,
    has_pre: false,
    total_pages: 0,
  });

  const adminAPI = {
    // 後台取得文章
    async adminGet(page: number|string = 1) {
      const res: any = await getFetchData({
        url: `/api/${apiPath}/admin/articles?page=${page}`,
        method: 'GET'
      });
      if (res && res.success) {
        articles.value = res.articles;
        pagination.value = res.pagination;
      }
    },
    // 後台新增文章
    async addArticle(data: postArticle) {
      const res: any = await getFetchData({
        url: `/api/${apiPath}/admin/article`,
        method: 'POST',
        params: { data }
      });
      useSwal({
        title: res.message,
        showConfirmButton: false,
        timer: 3000,
      })
    },
    
  }
  return{
    articles,
    pagination,
    ...adminAPI
  }
})

export default articleStore