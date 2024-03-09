export default function getDateStr(date: number | string | Date) {
  const { $i18n } = useNuxtApp()

  const timer = new Date(date)
  const dateStr = timer.toLocaleString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  // const weekStr = ['日', '一', '二', '三', '四', '五', '六']
  const week = $i18n.t(`common.date${timer.getDay()}`)
  return dateStr.replace(/\s/, ` (${week})  `)
}
