/**
 * @author walid
 * @date 2016/11/19
 * @description 个人中心
 */

let app = getApp()

Page({
    data: {
        userInfo: {},
        userListInfo: [{
            leftItem: '我的账户',
            margin: '20rpx',
            showArrow: true,
        }, {
            leftItem: '钱包余额',
            showArrow: true,
            rightItem: '暂无数据',
        }, {
            leftItem: '受邀伙伴',
            margin: '20rpx',
            showArrow: true,
        }, {
            leftItem: '填写邀请码',
            showArrow: true,
            rightItem: '未设置',
        }, {
            leftItem: '我的专属邀请码',
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
        let self = this
        self.setData({
            userInfo: app.globalData.userInfo
        })
    },

    headTap(e) {
        wx.navigateTo({
            url: app.router.mineaccount.url
        })
    },

    cellItemClick(e) {
        let index = e.currentTarget.dataset.index
        console.log("index = " + index)
        let url
        if (index == 0) {
            url = app.router.mineaccount.url
        } else if (index == 1) {
            url = app.router.insuranceexplain.url
        } else if (index == 2) {
            url = app.router.mineincome.url
        } else if (index == 3) {
            url = app.router.protocol.url
        } else if (index == 4) {
            return
        }
        wx.navigateTo({
            url: url
        })
    },
})
