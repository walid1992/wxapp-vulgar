/**
 * @author walid
 * @date 2016/11/20
 * @description router 工具类
 */

function _params(obj = {}) {
  let _ = encodeURIComponent
  return Object.keys(obj).map(k => `${_(k)}=${_(obj[k])}`).join('&')
}

export default {
  navigateTo(url, obj = {}) {
    wx.navigateTo({
      url: url + '?' + _params(obj)
    })
  },
  redirectTo(url, obj = {}) {
    wx.redirectTo({
      url: url + '?' + _params(obj)
    })
  },
  switchTab(url) {
    wx.switchTab({
      url: url
    })
  },
  navigateBack(delta = 1) {
    wx.navigateBack(delta)
  }
}