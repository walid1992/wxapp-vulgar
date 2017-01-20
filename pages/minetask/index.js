/**
 * @author walid
 * @date 2016/11/19
 * @description 我的任务页
 */

const app = getApp()

Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
    // 显示加载更多 loading
    hothidden: true
  },

  onLoad(options) {
    let self = this
    wx.getSystemInfo({
      success(res) {
        self.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        })
      }
    })
    app.showLoading()
  },

  onReady: function () {
    // 页面渲染完成
    // 数据加载完成后 延迟隐藏loading
    setTimeout(function () {
      app.hideToast()
    }, 500)
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh() {
    setTimeout(function () {
      app.hideToast()
    }, 200)
  },

  /**
   * 加载更多
   */
  onReachBottom: function () {
    let self = this
    if (!self.data.hothidden) {
      return
    }
    self.setData({
      hothidden: false
    })
    self.getTaskList()
  },

  /**
   * 获取计划
   */
  getTaskList() {
    let self = this
    app.$api.campaign.list(self.data.list.length, 10, function (res) {
      wx.stopPullDownRefresh()
      app.hideToast()
      // 如果数据为空，则显示没有更多数据
      let hothidden = true
      if (res.data.length <= 0) {
        setTimeout(function () {
          self.setData({
            hothidden: false
          })
        }, 200)
      }
      self.setData({
        hothidden: hothidden,
        list: self.data.list.concat(res.data)
      })
    })
  },

  /**
   * 滑动切换tab
   * @param e
   */
  bindChange(e) {
    let self = this
    self.setData({
      currentTab: e.detail.current
    })
  },
  /**
   * 点击tab切换
   * @param e
   * @returns {boolean}
   */
  swichNav(e) {
    let self = this
    if (this.data.currentTab === e.target.dataset.current) {
      return false
    } else {
      self.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})
