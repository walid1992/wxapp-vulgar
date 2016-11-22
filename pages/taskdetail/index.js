/**
 * @author walid
 * @date 2016/11/19
 * @description 任务详情页
 */

import taskApi from '../../api/task/index.js'
import router from '../../router/index.js'
import utils from '../../utils/util.js'
const app = getApp()

Page({
    data: {
        id: 0,
        taskInfoVo: {},
        taskEnd: false,
        action: ''
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
        taskApi.get({
            data: {
                taskId: self.data.id
            },
            success: function (data) {
                wx.hideToast()
                let action = '领取任务'
                data.taskInfoSteps.forEach(function (value, index) {
                    value.picJson = JSON.parse(value.picJson)
                })
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
                                }
                                self.setData({
                                    taskEnd: false,
                                    action: '提交任务 (' + utils.formatResiduedTimes(totalTime - time) + ')'
                                })
                            }, 1000)
                            break
                        case 2:
                            totalTime = data.userTaskItem.auditTimeCountDown / 1000
                            setInterval(function () {
                                time = ++time
                                if (totalTime - time <= 0) {
                                    self.setData({
                                        taskEnd: true,
                                        action: '已结束'
                                    })
                                }
                                self.setData({
                                    taskEnd: false,
                                    action: '审核中 (' + utils.formatResiduedTimes(totalTime / 1000 - time) + ')'
                                })
                            }, 1000)
                            break
                        default:
                            action = '已结束'
                            break
                    }

                } else {
                    action = data.canApply ? '领取任务' : '已结束'
                }
                self.setData({
                    taskInfoVo: data,
                    action: action
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
        let self = this;
        taskApi.userreceivetask({
            data: {
                taskId: self.data.id
            },
            success: function (data) {
                wx.hideToast()
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

    toAction(e) {
        let self = this
        let taskInfoVo = self.data.taskInfoVo
        if (taskInfoVo.userTaskItem) {
            if (taskInfoVo.userTaskItem.status == 1) {
                if (self.taskEnd) {
                    wx.showToast({
                        title: '任务已结束',
                        icon: 'success',
                        duration: 2000
                    })
                    return
                }
                router.navigateTo(router.config.taskdetail.url, {
                    id: self.data.id
                })
            }
        } else {
            self.userreceivetask()
        }
    }
})
