/**
 * @author walid
 * @date 2016/11/19
 * @description root app
 */

import router from  'router/index.js'
import loading from  './utils/loading.js'

App({
    onLaunch() {
        let self = this
        wx.login({
            success: function () {
                wx.getUserInfo({
                    success: function (res) {
                        self.globalData.userInfo.avatarUrl = res.userInfo.avatarUrl
                        self.globalData.userInfo.nickName = res.userInfo.nickName
                    }
                })
            }
        })
    },

    showLoading(duration = 10000) {
        loading.show(duration)
    },

    dismissLoading(){
        loading.dismiss()
    },

    globalData: {
        userInfo: {
            phoneNumber: '未绑定手机号',
            avatarUrl: '',
            nickName: '匿名用户'
        },
    },
    router: router,
})
