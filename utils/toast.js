/**
 * @author walid
 * @date 2016/11/23
 * @description 微信toast封装
 */

export default {
  showLoading (duration = 10000) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: duration
    })
  },

  showToast (msg = '消息', duration = 2000) {
    wx.showToast({
      title: msg,
      icon: 'success',
      duration: duration
    })
  },

  hideToast () {
    wx.hideToast()
  }
}