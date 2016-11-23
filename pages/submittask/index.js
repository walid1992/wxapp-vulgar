/**
 * @author walid
 * @date 2016/11/19
 * @description 任务详情页
 */

import taskApi from '../../api/task/index.js'
import router from '../../router/config.js'
import utils from '../../utils/util'
const app = getApp()

Page({
    data: {
        id: 0,
        tempFilePaths: [],
        taskEnd: false,
        action: ''
    },

    onLoad(options) {
        let self = this
        app.showLoading()
        self.setData({
            id: options.id
        })
        self.requestData()
    },

    requestData() {
        let self = this
        taskApi.get({
            data: {
                taskId: self.data.id
            },
            success: function (data) {
                app.dismissLoading()
                let action = '提交任务'
                let taskEnd = false
                if (data.userTaskItem) {
                    let time = 0
                    let totalTime
                    switch (data.userTaskItem.status) {
                        case 1:
                            totalTime = data.userTaskItem.disabledTimeCountDown / 1000
                            setInterval(function () {
                                time = ++time
                                if (totalTime - time <= 0) {
                                    self.setData({
                                        taskEnd: true,
                                        action: '已结束'
                                    })
                                    return
                                }
                                self.setData({
                                    taskEnd: false,
                                    action: '(请在' + utils.formatResiduedTimes(totalTime - time) + '之内提交)'
                                })
                            }, 1000)
                            taskEnd = false
                            break
                        default:
                            taskEnd = true
                            action = '已结束'
                            break
                    }
                } else {
                    taskEnd = true
                    action = '已结束'
                }
                app.dismissLoading()
                self.setData({
                    action: action,
                    taskEnd: taskEnd
                })
            },
            fail: function (code, msg) {
                wx.showToast({
                    title: msg,
                    icon: 'error',
                    duration: 2000
                })
            }
        })
    },

    userreceivetask(){
        let self = this
        taskApi.userreceivetask(self.data.id, {
            success: function (data) {
                app.dismissLoading()
                self.requestData()
            },
            fail: function (code, msg) {
                wx.showToast({
                    title: msg,
                    icon: 'error',
                    duration: 2000
                })
            }
        })
    },

    toAdd(e) {
        let self = this
        wx.chooseImage({
            count: 6,
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                console.log('res.tempFilePaths', res.tempFilePaths)
                self.setData({
                    tempFilePaths: res.tempFilePaths
                })
                console.log('self.tempFilePaths', self.data.tempFilePaths)
            }
        })
    },

    toPreview(e) {
        let self = this
        let current = e.target.dataset.current
        wx.previewImage({
            current: current,
            urls: self.data.tempFilePaths
        })
    },

    toAction(e) {
        let self = this
        if (self.taskEnd) {
            wx.showToast({
                title: '任务已结束',
                icon: 'success',
                duration: 2000
            })
            return
        }
        wx.showToast({
            title: '提交任务',
            icon: 'success',
            duration: 2000
        })
    }
})
