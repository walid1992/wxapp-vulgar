/**
 * @author walid
 * @date 2016/11/19
 * @description 活动主页
 */
let campaignApi = require('../../api/campaign/index.js')
let router = require('../../config/router.js')
let app = getApp()

Page({
    data: {
        // 显示加载更多 loading
        hothidden: true,
        list: [],
    },

    onLoad() {
        this.getTaskList()
    },

    // 下拉刷新
    onPullDownRefresh() {
        var self = this
        wx.showToast({
            title: '加载中...',
            icon: 'loading',
            duration: 10000
        })
        self.getTaskList()
    },

    getTaskList() {
        var self = this;
        campaignApi
            .list(self.data.list.length, 10, {
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
        self.getTaskList()
    },

    toItem(e) {
        var id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: router.campaignList.url + '?id=' + id
        })
    }
})
