/**
 * @author TaoMing
 * @date 2016/11/19
 * @description 我的钱包
 */

const app = getApp()

Page({
  data: {
    hothidden: true,
    list: [],
  },

  onLoad() {
    this.getUserSettlements()
  },

  // 下拉刷新
  onPullDownRefresh() {
    let self = this
    app.showLoading()
    self.getUserSettlements()
  },

  getUserSettlements() {
    let self = this
    app.$api.user.usersettlements({
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
          list: self.data.list.concat(data),
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
      hothidden: false,
    })
    self.getUserSettlements()
  },

  toAction(e) {
    let self = this
    wx.showModal({
      title: '温馨提示',
      content: '确认向支付宝账号' + app.globalData.userInfo.alipay + "提现吗?",
      success(res) {
        if (res.confirm) {
          self.withdrawtip()
        }
      }
    })
  },

  withdrawtip() {
    let self = this
    app.$api.user.withdrawtip({
      data: {},
      success(data) {
        wx.showModal({
          title: '温馨提示',
          content: data.tipString,
          success(res) {
            if (res.confirm) {
              if (data.withdrawMark) {
                self.withdraw()
              }
            }
          }
        })
      },
      fail(code, msg) {
        app.showToast(msg)
      }
    })
  },

  withdraw() {
    app.$api.user.withdraw({
      data: {},
      success(data) {
        wx.showModal({
          title: '温馨提示',
          content: data.tipString,
          success(res) {

          }
        })
      },
      fail(code, msg) {
        app.showToast(msg)
      }
    })
  }
})
