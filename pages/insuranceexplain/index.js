var insApi = require('../../api/task/index.js')

var app = getApp()

Page({
    data: {
        list: [],
    },

    onLoad() {
        this.getPlanList()
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
