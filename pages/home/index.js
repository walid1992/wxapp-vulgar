/**
 * @author walid
 * @date 2016/11/20
 * @description 任务首页
 */

let app = getApp()

Page({
  data: {
    // 显示加载更多 loading
    hothidden: true,
    list: []
  },

  onLoad() {
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
    app.$api.task.list({
      data: {
        start: self.data.list.length,
        size: 10
      },
      success(data) {
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
        }
        self.setData({
          hothidden: hothidden,
          list: self.data.list.concat(data)
        })
      },
      fail(code, msg) {
        console.log('error' + msg)
      }
    })
  },

  onReachBottom() {
    let self = this
    if (!self.data.hothidden) {
      return
    }
    // 加载更多 loading
    self.setData({
      hothidden: false
    })
    self.getTaskList()
  },

  toMineTask(e) {
    app.$router.navigateTo(app.$routerName.mineTask.url)
  },

  toItem(e) {
    let id = e.currentTarget.dataset.id
    app.$router.navigateTo(app.$routerName.taskdetail.url, {
      id: id
    })
  }
})
