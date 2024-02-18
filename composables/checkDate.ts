// 判斷日期是否有效
export default function checkDate(date: number|string|Date) {
  const timer = new Date(date).getTime()
  const today = new Date().toLocaleDateString()
  return timer >= new Date(today).getTime()
}