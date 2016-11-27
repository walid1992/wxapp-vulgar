/**
 * @author walid
 * @date 2016/11/19
 * @description 活动列表页
 */

import campaignApi from '../../api/campaign/index.js'
import router from '../../router/config.js'

Page({
    data: {
        id: 0,
        // 显示加载更多 loading
        hothidden: true,
        list: [],
    },

    onLoad(options) {
        this.getTaskList()
        this.setData({
            id: options.id
        })
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
        let self = this
        campaignApi
            .productList({
                data: {
                    campaignId: self.data.id,
                    start: self.data.list.length,
                    size: 10
                },
                success: function (data) {
                    wx.stopPullDownRefresh()
                    wx.hideToast()
                    // 如果数据为空，则显示没有更多数据
                    let hothidden = true
                    if (data.length <= 0) {
                        setTimeout(function () {
                            self.setData({
                                hothidden: false
                            })
                        }, 200)
                        return
                    }
                    self.setData({
                        hothidden: hothidden,
                        list: self.data.list.concat(data),
                    })
                }
            })
    },

    onReachBottom: function () {
        let self = this
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
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: router.planItem.url + '?id=' + id
        })
    }
})
