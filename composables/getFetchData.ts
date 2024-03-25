import loading from '../store/loading'
interface Params {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  params?: any
}

export default function getFetchData({ url, method = 'GET', params }: Params) {
  const { baseUrl } = useRuntimeConfig().public
  const { changeLoading } = loading()

  return new Promise((resolve, reject) => {
    useFetch(url, {
      method,
      baseURL: baseUrl,
      onRequest({ options }) {
        changeLoading(true)
        options.headers = {
          ...options.headers,
          authorization: useCookie('token').value || '',
        }
        if (method !== 'GET') {
          options.body = params
        }
      },
      async onResponseError({ request, response }) {
        // 处理响应错误
        const swal = await useSwal({
          icon: 'error',
          title: response?._data.message || 'Opps..',
          showConfirmButton: false,
          timer: 3000,
        })

        if (
          request.toString().includes('/api/user/check') &&
          swal.isDismissed
        ) {
          useRouter().push('/')
        }

        reject(response?._data)
      },
      onResponse({ response }) {
        resolve(response._data)
      },
    })
      .then((res) => {
        changeLoading(res.pending.value)
      })
      .catch((error) => {
        changeLoading(false)
        reject(error)
      })
  })
}
