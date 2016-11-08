var insApi = require('../../api/ins/ins.js')

var app = getApp()

Page({
    data: {
        list: [],
    },

    onLoad() {
        this.getPlanList()
        app.getUserInfo()
    },

    // 下拉刷新
    onPullDownRefresh() {
        this.getPlanList()
    },

    getPlanList() {
        var self = this;
        insApi.list(function(res) {
            wx.stopPullDownRefresh()
            self.setData({
                list: res.data
            })
        })
    },
})
