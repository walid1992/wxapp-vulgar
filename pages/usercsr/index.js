/**
 * @author 陶明
 * @date 2016/11/28
 * @description 受邀伙伴
 */

const app = getApp()

Page({
  data: {
    // 显示加载更多 loading
    hothidden: true,
    list: []
  },

  onLoad() {
    this.getUserCsr()
  },

  // 下拉刷新
  onPullDownRefresh() {
    let self = this
    app.showLoading()
    self.getUserCsr()
  },

  getUserCsr() {
    let self = this
    app.$api.user.usercsr({
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

  onReachBottom: function () {
    let self = this
    if (!self.data.hothidden) {
      return
    }
    // 加载更多 loading
    self.setData({
      hothidden: false
    })
    self.getUserCsr()
  }
})
