// 判斷日期是否有效
export default function moneyFormat(number: number | string, unit = '$') {
  if (number !== 0 && !number) {
    return ''
  }
  const money = number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
  return `${unit}${money}`
}