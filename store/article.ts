import { defineStore } from 'pinia'
import type {
  postArticle,
  paginationType,
  Article,
  ArticleDetail,
} from '../interface/article'

const articleStore = defineStore('articleStore', () => {
  const { apiPath } = useRuntimeConfig().public

  const articles = ref<Article[]>([])
  const article = ref<ArticleDetail>({
    title: '',
    description: '',
    image: '',
    tag: [],
    create_at: '',
    author: '',
    isPublic: false,
    content: '',
  })
  const pagination = ref<paginationType>({
    current_page: 0,
    has_next: false,
    has_pre: false,
    total_pages: 0,
  })

  const adminAPI = {
    // 後台取得文章
    async adminGet(page: number | string = 1) {
      const res: any = await getFetchData({
        url: `/api/${apiPath}/admin/articles?page=${page}`,
        method: 'GET',
      })
      if (res && res.success) {
        articles.value = res.articles
        pagination.value = res.pagination
      }
    },
    // 後台取得單一文章
    async adminDetail(id: string) {
      const res: any = await getFetchData({
        url: `/api/${apiPath}/admin/article/${id}`,
        method: 'GET',
      })
      if (res && res.success) {
        article.value = res.article
      }
    },
    // 後台新增文章
    async addArticle(data: postArticle) {
      const res: any = await getFetchData({
        url: `/api/${apiPath}/admin/article`,
        method: 'POST',
        params: { data },
      })
      useSwal({
        title: res.message,
        showConfirmButton: false,
        timer: 3000,
      })
    },
    // 後台刪除文章
    async adminDel(id: string) {
      const res: any = await getFetchData({
        url: `/api/${apiPath}/admin/article/${id}`,
        method: 'DELETE',
      })
      useSwal({
        title: res.message,
        showConfirmButton: false,
        timer: 3000,
      })
    },
    // 後台修改文章
    async adminPUT(id: string, data: postArticle) {
      const res: any = await getFetchData({
        url: `/api/${apiPath}/admin/article/${id}`,
        method: 'PUT',
        params: { data },
      })
      useSwal({
        title: res.message,
        showConfirmButton: false,
        timer: 3000,
      })
    },
  }

  const frontAPI = {
    async articlesGet(page: number | string = 1) {
      const res: any = await getFetchData({
        url: `/api/${apiPath}/articles?page=${page}`,
        method: 'GET',
      })
      if (res && res.success) {
        articles.value = res.articles
        pagination.value = res.pagination
      }
    },
    async articleView(id: string) {
      const res: any = await getFetchData({
        url: `/api/${apiPath}/article/${id}`,
        method: 'GET',
      })
      if (res && res.success) {
        article.value = res.article
      }
    },
  }
  return {
    articles,
    article,
    pagination,
    ...adminAPI,
    ...frontAPI,
  }
})

export default articleStore
