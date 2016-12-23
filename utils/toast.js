/**
 * @author walid
 * @date 2016/11/23
 * @description 微信toast封装
 */

export default {
  showLoading: function (duration = 10000) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: duration
    })
  },

  showToast: function (msg = '消息', duration = 2000) {
    wx.showToast({
      title: msg,
      icon: 'success',
      duration: duration
    })
  },

  hideToast: function () {
    wx.hideToast()
  }
}