import type { adminPost } from './product'

export interface addCartDate {
  product_id: string
  qty: number
}

export interface cartsList extends addCartDate {
  final_total: number
  id: string
  product: adminPost
  total: number
}

export interface cartDate {
  carts: cartsList[]
  final_total: number
  total: number
}
