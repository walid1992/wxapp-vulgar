/**
 * @author walid
 * @date 2016/11/20
 * @description 任务首页
 */

import taskApi from '../../api/task/index.js'
import router from '../../router/config.js'
import utils from '../../utils/util'

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
        taskApi.list(self.data.list.length, 10, {
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

    toMineTask(e) {
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: router.mineTask.url
        })
    },

    toItem(e) {
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: router.taskdetail.url + '?id=' + id
        })
    }
})
