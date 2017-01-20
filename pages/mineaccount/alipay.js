/**
 * @author taoming
 * @date 2016/11/26
 * @description 修改支付宝信息页面
 */

const app = getApp()

Page({
  data: {
    alipay: '',
    errorMsgHidden: true,
    errorMsg: '',
    redirectUrl: ''
  },

  onLoad(options) {
    if (options && options.redirectUrl) {
      this.setData({
        redirectUrl: options && options.redirectUrl
      })
    }
  },

  //手机号change
  alipayChange(e) {
    this.setData({
      alipay: e.detail.value
    })
  },

  //显示错误信息
  showErrormsg(msg) {
    this.setData({
      errorMsg: msg,
      errorMsgHidden: false
    })
  },

  postAlipay(e) {
    let self = this
    if (!this.data.alipay) {
      this.showErrormsg('请填写支付宝信息')
      return
    }
    app.$api.user
      .profileupdate({
        data: {
          alipay: this.data.alipay
        },
        success: function (data) {
          app.globalData.userInfo.alipay = data.alipay
          if (self.data.redirectUrl) {
            app.$router.redirectTo(self.data.redirectUrl)
            return
          }
          app.$router.navigateBack()
        },
        fail(code, msg) {
          self.showErrormsg(msg)
        }
      })
  },

  errorMsgSuccess() {
    this.setData({
      errorMsgHidden: true
    })
  }
})
