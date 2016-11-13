var app = getApp()

Page({
    data: {
        userInfo: {},
        userListInfo: [{
            leftItem: '我的账户',
            margin: '20rpx',
            showArrow: true,
        }, {
            leftItem: '邀请好友 （一起赚钱）',
            margin: '20rpx',
            showArrow: true,
        }, {
            leftItem: '我的业绩',
            showArrow: true,
        }, {
            leftItem: '用户协议',
            margin: '20rpx',
            showArrow: true,
        }, {
            leftItem: '当前版本',
            rightItem: 'V 1.0.0 (内测版)',
            margin: '20rpx',
            showArrow: false,
        }]
    },

    onLoad: function() {
        var self = this
        app.getUserInfo(function(userInfo) {
            //更新数据
            self.setData({
                userInfo: userInfo
            })
        })
    },

    headTap(e) {
        wx.navigateTo({
            url: app.router.mineaccount.url
        })
    },

    cellItemClick(e) {
        var index = e.currentTarget.dataset.index
        console.log("index = " + index)
        var url
        if (index == 0) {
            url = app.router.login.url
        } else if (index == 1) {
            url = app.router.insuranceexplain.url
        } else if (index == 2) {
            url = app.router.mineincome.url
        } else if (index == 3) {
            url = app.router.protocol.url
        }else if (index == 4) {
            return
        }
        wx.navigateTo({
            url: url
        })
    },
})
