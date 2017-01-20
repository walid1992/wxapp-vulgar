/**
 * @author walid
 * @date 2016/11/19
 * @description 任务详情页
 */

import utils from '../../utils/date'

const app = getApp()

Page({
  data: {
    id: 0,
    taskInfoVo: {},
    taskEnd: false,
    action: ''
  },

  onLoad(options) {
    app.showLoading()
    this.setData({
      id: options.id
    })
    this.requestData()
  },

  requestData() {
    let self = this
    app.$api.task.get({
      data: {
        taskId: self.data.id
      },
      success(data) {
        app.hideToast()
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
          action = '领取任务'
        }
        self.setData({
          taskInfoVo: data,
          action: action
        })
      },
      fail (code, msg) {
        app.showToast(msg)
      }
    })
  },

  userreceivetask(){
    let self = this
    app.$api.task.userreceivetask({
      data: {
        taskId: self.data.id
      },
      success(data) {
        app.hideToast()
        self.requestData()
      },
      fail(code, msg) {
        app.showToast(msg)
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
          app.showToast('任务已结束')
          return
        }
        app.$router.navigateTo(app.$routerName.taskdetail.url, {
          id: self.data.id
        })
      }
    } else {
      // TODO 测试
      // if (!self.data.taskInfoVo.canApply) {
      //     wx.showToast({
      //         title: '暂时不能领取任务，请确认是否登录~',
      //         icon: 'success',
      //         duration: 2000
      //     })
      //     return
      // }
      // self.userreceivetask()
      app.$router.navigateTo(app.$routerName.submittask.url, {
        id: self.data.id
      })
    }
  }
})
