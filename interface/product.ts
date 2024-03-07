export interface adminGet {
  page: string
  category: string
}

export interface adminPost {
  title: string
  category: string
  origin_price: number
  price: number
  unit: string
  description: string
  finalTime: number
  content: string[]
  saveMethods: string[]
  imageUrl: string
  imagesUrl: string[]
  is_enabled: number
  id?: string
  saveMode: number
}

export interface paginationType {
  current_page: number
  has_next: boolean
  has_pre: boolean
  total_pages: number
  [propName: string]: any
}
