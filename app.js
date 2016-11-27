/**
 * @author walid
 * @date 2016/11/19
 * @description root app
 */

import router from  'router/index.js'
import loading from  './utils/wx-toast.js'
import api from  './api/user/index.js'

App({
    onLaunch() {
        let self = this
        wx.login({
            success: function (loginRes) {
                wx.getUserInfo({
                    success: function (userInfoRes) {
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
                        api.loginbyopenid({
                            data: data,
                            success: function (data) {
                                self.globalData.ticketInfo = {
                                    ticket: data.ticket.ticket,
                                    refreshToken: data.ticket.refreshToken
                                };
                                self.globalData.userInfo = {
                                    avatarUrl:userInfoRes.userInfo.avatarUrl,
                                    name:data.userInfo.name,
                                    phoneNum:data.userInfo.phone,
                                    alipay:data.userInfo.alipay,
                                    inviteCode:data.userInfo.inviteCode
                                };
                                wx.setStorageSync('ticket', data.ticket.ticket);
                            },
                            fail: function (code, msg) {


                            }
                        })

                    }
                })
            }
        })
    },

    showLoading(duration) {
        loading.showLoading(duration)
    },

    showToast(msg, duration) {
        loading.showToast(msg, duration)
    },

    hideToast(){
        loading.hideToast()
    },

    globalData: {
        userInfo: null,
        ticketInfo: null
    },
    router: router,
})
