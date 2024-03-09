import type { headerLink } from './header'
export interface homeNav extends headerLink {
  imgUrl: string
}

export interface stepsType {
  name: ComputedRef<string>
  imgUrl: string
}
