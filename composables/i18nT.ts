// 判斷日期是否有效
export default function i18nT(key: string, arr: any = []) {
  const { $i18n } = useNuxtApp()
  return $i18n.t(key, arr)
}
