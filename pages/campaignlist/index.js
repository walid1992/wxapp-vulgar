/**
 * @author walid
 * @date 2016/11/19
 * @description 活动列表页
 */

import campaignApi from '../../api/campaign/index.js'
import router from '../../router/index.js'

const app = getApp()

Page({
    data: {
        id: 0,
        // 显示加载更多 loading
        hothidden: true,
        list: [],
    },

    onLoad(options) {
        this.setData({
            id: options.id
        })
        this.getTaskList()
    },

    // 下拉刷新
    onPullDownRefresh() {
        let self = this
        app.showLoading()
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
                    app.hideToast()
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
        router.navigateTo(router.config.campaigndetail.url, {
            id: id
        })
    },

    toAction(e) {
        let self = this
        router.navigateTo(router.config.campaigncustom.url, {
            id: self.data.id
        })
    },
})
