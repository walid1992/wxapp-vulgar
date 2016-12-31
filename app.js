/**
 * @author walid
 * @date 2016/11/19
 * @description root app
 */

import api from 'api/index.js'
import router from 'utils/router.js'
import routerName from 'router/index.js'
import toast from 'utils/toast.js'

App({
  onLaunch() {
    let self = this
    wx.login({
      success(loginRes) {
        wx.getUserInfo({
          success(userInfoRes) {
            //TODO:转义+和&防止转义为空
            let encodeEncrypt = userInfoRes.encryptData && userInfoRes.encryptData.replace(/\+/g, '%2B').replace(/\&/g, '%26');
            let iv = userInfoRes.iv.replace(/\+/g, '%2B').replace(/\&/g, '%26')
            let data = {
              thirdCode: loginRes.code,
              headLogo: userInfoRes.userInfo.avatarUrl,
              scope: 'base',
              wxEncryptData: encodeEncrypt,
              iv: iv
            }
            api.user.loginbyopenid({
              data: data,
              success(data) {
                self.globalData.ticketInfo = {
                  ticket: data.ticket.ticket,
                  refreshToken: data.ticket.refreshToken
                }
                self.globalData.userInfo = {
                  avatarUrl: userInfoRes.userInfo.avatarUrl,
                  name: data.userInfo.name,
                  phoneNum: data.userInfo.phone,
                  alipay: data.userInfo.alipay,
                  inviteCode: data.userInfo.inviteCode
                }
                wx.setStorageSync('ticket', data.ticket.ticket)
              }
            })

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
  },
})
