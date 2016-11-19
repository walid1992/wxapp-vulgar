/**
 * @author walid
 * @date 2016/11/19
 * @description 任务详情页
 */
const taskApi = require('../../api/task/index.js');
const router = require('../../config/router.js');
const app = getApp();

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
        let self = this;
        taskApi.get(self.data.id, {
            success: function (data) {
                wx.hideToast()
                console.log(data)

                data.taskInfoSteps.forEach(function (value, index) {
                    value.picJson = JSON.parse(value.picJson)
                })
                self.setData({
                    taskInfoVo: data,
                })
            },
            fail: function (code, msg) {
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

    toPreview(e) {
        let stepIndex = e.target.dataset.stepIndex
        let urls = []
        this.data.taskInfoVo.taskInfoSteps[stepIndex].picJson.forEach(function (value, index) {
            urls.push(value.smallUrl)
        })
        wx.previewImage({
            current: e.target.dataset.current,
            urls: urls
        })
    },

    toMineTask(e) {
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: router.mineTask.url
        })
    }
})
