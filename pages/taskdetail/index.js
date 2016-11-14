var taskApi = require('../../api/task/index.js')
var router = require('../../config/router.js')

var app = getApp()

Page({
    data: {
        id: 0,
        taskInfoVo: {},
    },

    onLoad(options) {
        wx.showToast({
            title: '加载中...',
            icon: 'loading',
            duration: 10000
        })
        this.setData({
            id: options.id
        })
        this.requestData()
    },

    requestData() {
        var self = this;
        taskApi.get(self.data.id, {
            success: function(data) {
                wx.hideToast()
                self.setData({
                    taskInfoVo: data,
                })
            },
            fail: function(code, msg) {
                wx.hideToast()
                wx.showToast({
                    title: msg,
                    icon: 'error',
                    duration: 10000
                })
                console.log('error' + msg)
            }
        })
    },

    toMineTask(e) {
        var id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: router.mineTask.url
        })
    }
})
