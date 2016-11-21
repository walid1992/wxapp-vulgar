/**
 * @author walid
 * @date 2016/11/19
 * @description 活动主页
 */

import campaignApi from '../../api/campaign/index.js'
import router from '../../router/config.js'

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
        let self = this
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
            .list({
                data: {
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
                    }
                    self.setData({
                        hothidden: hothidden,
                        list: self.data.list.concat(data),
                    })
                },
                fail: function (code, msg) {
                    console.log('error' + msg)
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
            url: router.campaignList.url + '?id=' + id
        })
    }
})
