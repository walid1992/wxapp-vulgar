var insApi = require('../../api/ins/ins.js')
var router = require('../../config/router.js')

var app = getApp()

Page({
    data: {
        // 显示加载更多 loading
        hothidden: true,
        // loading
        hidden: true,
        list: [],
    },

    onLoad() {
        this.getPlanList()
        app.getUserInfo()
    },

    // 下拉刷新
    onPullDownRefresh() {
        var that = this
        that.setData({
            hidden: false
        })
        setTimeout(function() {
            that.setData({
                hidden: true
            })
        }, 200)
        that.getPlanList()
    },

    getPlanList() {
        var self = this;
        insApi.list(self.data.list.length, 10, function(res) {
            wx.stopPullDownRefresh()
                // 如果数据为空，则显示没有更多数据
            var hothidden = true
            if (res.data.length <= 0) {
                setTimeout(function() {
                    self.setData({
                        hothidden: false
                    })
                }, 200)
            }

            self.setData({
                hidden: true,
                hothidden: hothidden,
                list: self.data.list.concat(res.data),
            })
        })
    },

    scrolltolower: function(e) {
        var self = this
            // 加载更多 loading
        self.setData({
            hothidden: false,
        })
        self.getPlanList()
    },

    toItem(e) {
        var id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: router.planItem.url + '?id=' + id
        })
    }
})
