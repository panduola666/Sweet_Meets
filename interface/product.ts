export interface adminGet {
  page: string,
  category: string
}

export interface paginationType {
  current_page: number,
  has_next: boolean,
  has_pre: boolean,
  total_pages: number,
  [propName: string]: any
}