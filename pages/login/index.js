/**
 * @author walid
 * @date 2016/11/19
 * @description 登录页
 */

const app = getApp()

Page({
  data: {
    getCodeLock: false,
    code: '',
    phone: '',
    verifyCode: '',
    loginLocked: false,
    redirectUrl: ''
  },

  onLoad(options) {
    if (options && options.redirectUrl) {
      this.setData({
        redirectUrl: options && options.redirectUrl
      })
    }
  },

  //验证码change
  onCodeChange(e) {
    this.setData({
      verifyCode: e.detail.value
    })
  },

  //手机号change
  onPhoneChange(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  //获取验证码
  toGetCode(e) {
    let self = this
    if (!this.data.phone) {
      app.showToast('请填写手机号')
      return
    }
    if (!/^1\d{10}$/.test(this.data.phone)) {
      app.showToast('请输入正确的手机号码')
      return
    }
    if (this.data.getCodeLock) {
      return
    }
    this.setData({
      getCodeLock: true
    })
    let requestData = {
      mobile: this.data.phone
    }
    self.countdown()
    app.$api.common
      .getauthcode({
        data: {
          telephone: this.data.phone,
          countryCode: '86'
        },
        success(data) {
          app.showToast('验证码已发送')
        },
        fail(code, msg) {
          app.showToast(msg)
          self.setData({
            getCodeLock: false
          })
        }
      })
  },

  //倒计时
  countdown() {
    let self = this
    let count = 60
    let phoneTimer = setInterval(function () {
      if (count == 0) {
        self.setData({
          codeButtonText: '',
          getCodeLock: false
        })
        clearInterval(phoneTimer)
      } else {
        self.setData({
          codeButtonText: count + '秒后重试'
        })
      }
      count--
    }, 1000)
  },

  //提交验证
  validate() {
    let self = this
    if (!this.data.phone) {
      app.showToast('请输入您的手机号码')
      this.setData({
        loginLocked: false
      })
      return
    }
    if (!this.data.verifyCode) {
      app.showToast('请输入您收到的验证码')
      this.setData({
        loginLocked: false
      })
      return
    }
    if (this.data.loginLocked) {
      return
    }
    this.setData({
      loginLocked: true
    })

    //绑定手机号码
    app.$api.user
      .bindtelephone({
        data: {
          telephone: this.data.phone,
          authCode: this.data.verifyCode,
          type: 2
        },
        success(data) {
          app.globalData.userInfo.phoneNum = data.phone
          if (self.data.redirectUrl) {
            app.$router.redirectTo(self.data.redirectUrl)
            return
          }
          app.$router.navigateBack()
        },
        fail(code, msg) {
          app.showToast(msg)
          self.setData({
            loginLocked: false
          })
        }
      })
  }
})
