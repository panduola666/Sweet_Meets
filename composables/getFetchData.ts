

interface Params{
  url: string,
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
  params?: any
}

export default function getFetchData ({url, method = 'GET', params}: Params) {
  const { baseUrl } = useRuntimeConfig().public
  return new Promise<void>(async (resolve, reject) => {
    try {
      const { data } = await useFetch(url,
      {
        method,
        baseURL: baseUrl,
        onRequest({options}) {
              options.headers = {
              ...options.headers,
              authorization: useCookie('token').value || ''
            }
            if(method !== 'GET') {
              options.body = {...params}
            }
            
        },
       async onResponseError({ request, response, options }) {
          // 处理响应错误
         const swal = await useSwal({
            icon: 'error',
            title: response?._data.message,
            showConfirmButton: false,
            timer: 3000
          })
          
          if(request.toString().includes('/api/user/check') && swal.isDismissed) {
            useRouter().push('/')
          }
          
          reject(response?._data)
      }
      })
      resolve(data.value);
    } catch (error) {
      console.log('catch', error);
      reject(error);
    }
    
  })
}
