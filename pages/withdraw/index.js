/**
 * @author 陶明
 * @date 2016/11/27
 * @description 提现页面
 */

const app = getApp()

Page({
  data: {
    // 显示加载更多 loading
    hothidden: true,
    list: []
  },

  onLoad() {
    this.getUserWithdrawList()
  },

  /**
   *  下拉刷新
   */
  onPullDownRefresh() {
    let self = this
    app.showLoading()
    self.getUserWithdrawList()
  },

  getUserWithdrawList() {
    let self = this
    app.$api.user.withdrawlist({
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
        app.showToast(msg)
      }
    })
  },

  /**
   * 滚动到底部
   */
  onReachBottom() {
    let self = this
    if (!self.data.hothidden) {
      return
    }
    // 加载更多 loading
    self.setData({
      hothidden: false
    })
    self.getUserWithdrawList()
  }
})
