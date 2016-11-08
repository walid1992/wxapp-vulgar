var app = getApp()
Page({
    data: {
        userInfo: {},
        modalHidden: true,
        userListInfo: [{
            icon: '../../images/iconfont-dingdan.png',
            leftItem: '姓名',
            rightItem: 'walid',
            margin: '20rpx',
        }, {
            icon: '../../images/iconfont-card.png',
            leftItem: '手机号',
            rightItem: '18514595412',
        }, {
            icon: '../../images/iconfont-icontuan.png',
            leftItem: '绑定微信',
            rightItem: '已绑定',
        }]
    },

    onLoad: function() {
        var that = this
            //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })
    },

    logoutTap: function(e) {
        this.setData({
            modalHidden: false
        })
    },

    modalChange: function(e) {
        this.setData({
            modalHidden: true
        })
    },

})
