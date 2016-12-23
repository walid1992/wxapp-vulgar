/**
 * @author walid
 * @date 2016/11/20
 * @description 工具类
 */

function formatTime(date) {
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatResiduedTimes(long) {
  let hour = 0
  let minute = 0
  let second = long
  if (second > 60) {
    //取整
    minute = Math.floor(second / 60)
    //取余
    second = second % 60
  }
  if (minute > 60) {
    hour = Math.floor(minute / 60)
    minute = minute % 60
  }
  return hour + "时" + minute + "分" + second + "秒"
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function urlParam(name) {
  let results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href)
  if (!results) {
    return ''
  }
  return results[1] || ''
}

export default {
  formatTime: formatTime,
  urlParam: urlParam,
  formatResiduedTimes: formatResiduedTimes
}
