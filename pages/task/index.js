var taskApi = require('../../api/task/index.js')
var router = require('../../config/router.js')

var app = getApp()

Page({
    data: {
        // 显示加载更多 loading
        hothidden: true,
        list: [],
    },

    onLoad() {
        this.getPlanList()
    },

    // 下拉刷新
    onPullDownRefresh() {
        var that = this
        wx.showToast({
            title: '加载中...',
            icon: 'loading',
            duration: 10000
        })
        that.getPlanList()
    },

    getPlanList() {
        var self = this;
        taskApi.list(self.data.list.length, 10, {
            success: function(data) {
                wx.stopPullDownRefresh()
                wx.hideToast()
                    // 如果数据为空，则显示没有更多数据
                var hothidden = true
                if (data.length <= 0) {
                    setTimeout(function() {
                        self.setData({
                            hothidden: false
                        })
                    }, 200)
                }
                self.setData({
                    hothidden: hothidden,
                    list: self.data.list.concat(data),
                })
            },
            fail: function(code, msg) {
                console.log('error' + msg)
            }
        })
    },

    onReachBottom: function() {
        var self = this
        if (!self.data.hothidden) {
            return
        }
        // 加载更多 loading
        self.setData({
            hothidden: false,
        })
        self.getPlanList()
    },

    toMineTask(e) {
        var id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: router.mineTask.url
        })
    },

    toItem(e) {
        var id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: router.planItem.url + '?id=' + id
        })
    }
})
