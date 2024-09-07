/*
 * @Author: Evan 360313191@qq.com
 * @Date: 2024-09-07 16:45:42
 * @LastEditors: Evan 360313191@qq.com
 * @LastEditTime: 2024-09-07 17:06:27
 * @FilePath: \Mswap_devMain\src\utils\tools.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export function formatNumber(num: any): any {
  num = Number(num)
  if (!num) return num
  if (num >= 1e9) {
    return (num / 1e9).toFixed(2) + 'B'
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(2) + 'M'
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(2) + 'K'
  }
  return num.toFixed(2)
}

export function timeAgo(timestamp: any): any {
  const currentDate: any = Date.now() / 1000
  const seconds = Math.floor(currentDate - timestamp)
  if (seconds < 0) return ''

  let interval = Math.floor(seconds / 31536000)

  if (interval > 1) {
    return `${interval}Y ago`
  }
  interval = Math.floor(seconds / 2592000)
  if (interval > 1) {
    return `${interval}M ago`
  }
  interval = Math.floor(seconds / 86400)
  if (interval > 1) {
    return `${interval}D ago`
  }
  interval = Math.floor(seconds / 3600)
  if (interval > 1) {
    return `${interval}h ago`
  }
  interval = Math.floor(seconds / 60)
  if (interval > 1) {
    return `${interval}m ago`
  }
  return `${Math.floor(seconds)} s ago`
}
