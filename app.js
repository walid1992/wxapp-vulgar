var router = require('config/router.js')

//app.js
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

    globalData: {
        userInfo: {
            phoneNumber: '未绑定手机号',
            avatarUrl: '',
            nickName: '匿名用户'
        },
    },
    router: router,
})
