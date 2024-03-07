import { defineStore } from 'pinia'

const routeStore = defineStore('routeStore', () => {
  const pageTitle = ref<string>('相遇甜點')

  const title = new Map([
    ['index', '相遇甜點'],
    ['diy', 'DIY課程'],
    ['order', '預約表單'],
    ['activity', '活動預約'],
    ['place', '場地租借'],
    ['admin-products', '課程管理'],
    ['admin-products-id', '編輯課程'],
    ['admin-activities', '活動管理'],
    ['admin-activities-id', '活動編輯'],
    ['admin-orders', '預約管理'],
  ])

  function changeTitle(routeName: string | null | undefined) {
    if (routeName) {
      pageTitle.value = title.get(routeName) || '相遇甜點'
    } else {
      pageTitle.value = '相遇甜點'
    }
  }
  return {
    pageTitle,
    changeTitle,
  }
})

export default routeStore
