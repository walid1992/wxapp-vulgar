var app = getApp()
Page({
    data: {
        userInfo: {},
        modalHidden: true,
        userListInfo: []
    },

    onLoad: function () {
        this.setData({
            userInfo: app.globalData.userInfo,
            userListInfo: [
                {
                    icon: '../../images/iconfont-dingdan.png',
                    leftItem: '姓名',
                    rightItem: 'walid',
                    margin: '20rpx',
                }, {
                    icon: '../../images/iconfont-card.png',
                    leftItem: '手机号',
                    rightItem: app.globalData.userInfo.phoneNumber,
                }, {
                    icon: '../../images/iconfont-icontuan.png',
                    leftItem: '绑定微信',
                    rightItem: '已绑定',
                }
            ]
        })
    },

    cellItemClick(e) {
        var index = e.currentTarget.dataset.index
        console.log("index = " + index)
        if (index == 1) {
            wx.navigateTo({
                url: app.router.login.url
            })
        }
    },

    logoutTap: function (e) {
        this.setData({
            modalHidden: false
        })
    },

    modalChange: function (e) {
        this.setData({
            modalHidden: true
        })
    },

})
