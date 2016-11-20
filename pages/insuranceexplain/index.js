/**
 * @author walid
 * @date 2016/11/19
 * @description 产品说明页
 */

let insApi = require('../../api/task/index.js')
let app = getApp()

Page({
    data: {
        list: [],
    },

    onLoad() {
        this.getTaskList()
    },

    // 下拉刷新
    onPullDownRefresh() {
        this.getTaskList()
    },

    getTaskList() {
        var self = this;
        insApi.list(function(res) {
            wx.stopPullDownRefresh()
            self.setData({
                list: res.data
            })
        })
    },
})
