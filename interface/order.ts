import type { adminPost } from './product'
export interface orderUser {
  name: string
  email: string
  tel: string
  address: string
  birth: string
  productData: adminPost
  orderDate: string
  totalPerson: number
  totalTime: number
  productId: string
}

export interface postOrder {
  message: string
  user: orderUser
}

export interface viewUserOrder {
  create_at: number
  id: string
  is_paid: boolean
  message?: string
  products: object
  total: number
  user: orderUser
}

export interface orderAdminData {
  id: string
  total: number
  user: orderUser
  [key: string]: any
}
