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
    app.$api.task.get({
      data: {
        taskId: self.data.id
      },
      success (data) {
        app.hideToast()
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
        app.hideToast()
        self.setData({
          action: action,
          taskEnd: taskEnd
        })
      },
      fail (code, msg) {
        app.showToast(msg)
      }
    })
  },

  userreceivetask(){
    let self = this
    app.$api.task.userreceivetask(self.data.id, {
      success (data) {
        app.hideToast()
        self.requestData()
      },
      fail (code, msg) {
        app.showToast(msg)
      }
    })
  },

  toAdd(e) {
    let self = this
    wx.chooseImage({
      count: 6,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success (res) {
        let tempFilePaths = self.data.tempFilePaths.concat(res.tempFilePaths)
        self.setData({
          tempFilePaths: tempFilePaths
        })
        console.log('self.tempFilePaths', self.data.tempFilePaths)
      }
    })
  },

  toPreview(e) {
    let self = this
    let current = e.target.dataset.current
    console.log('current', current)
    wx.previewImage({
      current: current,
      urls: self.data.tempFilePaths
    })
  },

  toAction(e) {
    let self = this
    if (self.taskEnd) {
      app.showToast('任务已结束')
      return
    }
    app.showToast('提交任务')
  }
})
