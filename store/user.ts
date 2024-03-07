import { defineStore } from 'pinia'
import type { loginType } from '@/interface/user'

const userStore = defineStore('user', () => {
  const isLogin = ref<boolean>(false)

  // 登入
  async function login(data: loginType) {
    try {
      const res: any = await getFetchData({
        url: '/admin/signin',
        method: 'POST',
        params: data,
      })
      if (res.success) {
        const cookie = useCookie('token', {
          expires: new Date(res.expired),
        })
        cookie.value = res.token
        isLogin.value = true
      }
    } catch (err) {}
  }

  //  check權限
  async function checkLogin() {
    const res: any = await getFetchData({
      url: '/api/user/check',
      method: 'POST',
    })
    if (res) {
      isLogin.value = res.success
    }
  }

  //  登出
  async function logout() {
    const token = useCookie('token')
    token.value = null
    const swal = await useSwal({
      title: '已登出',
      showConfirmButton: false,
      timer: 3000,
    })
    if (swal.isDismissed as boolean) {
      useRouter().push('/')
    }
  }

  return {
    isLogin,
    login,
    checkLogin,
    logout,
  }
})

export default userStore
