export interface postArticle {
  title: string,
  description: string,
  image: string,
  tag: string[],
  create_at: number|string|Date,
  author: string,
  isPublic: boolean,
  content: string,
}

export interface paginationType {
  current_page: number,
  has_next: boolean,
  has_pre: boolean,
  total_pages: number,
  [propName: string]: any
}