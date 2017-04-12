/**
 * @author walid
 * @date 2016/11/19
 * @description root app
 */

import api from 'api/index.js'
import router from 'utils/router.js'
import routerName from 'router/index.js'
import toast from 'utils/wechat/toast.js'

App({
  onLaunch() {
    let self = this
    wx.login({
      success(loginRes) {
        wx.getUserInfo({
          success(userInfoRes) {
            console.log('userInfoRes', userInfoRes)
            self.globalData.userInfo = userInfoRes.userInfo
          }
        })
      }
    })
  },

  showLoading(duration) {
    toast.showLoading(duration)
  },

  showToast(msg, duration) {
    toast.showToast(msg, duration)
  },

  hideToast(){
    toast.hideToast()
  },

  $api: api,
  $routerName: routerName,
  $router: router,

  globalData: {
    userInfo: null,
    ticketInfo: null
  }
})
