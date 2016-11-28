/**
 * @author walid
 * @date 2016/11/19
 * @description 登录页
 */

import commonApi from '../../api/common/index.js'
import userApi from '../../api/common/index.js'

const app = getApp()

Page({
    data: {
        getCodeLock: false,
        codeButtonText: '获取验证码',
        phone: '',
        verifyCode: '',
        errorMsgHidden: true,
        loginLocked: false,
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

    //验证码change
    codeChange(e) {
        this.setData({
            verifyCode: e.detail.value
        });
    },

    //手机号change
    phoneChange(e) {
        this.setData({
            phone: e.detail.value
        });
    },

    //显示错误信息
    showErrormsg(msg) {
        this.setData({
            errorMsg: msg,
            errorMsgHidden: false
        })
    },

    //获取验证码
    getCodeTap(e) {
        let self = this
        if (!this.data.phone) {
            this.showErrormsg('请填写手机号')
            return
        }
        if (!/^1\d{10}$/.test(this.data.phone)) {
            this.showErrormsg('请输入正确的手机号码')
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
        commonApi
            .getauthcode({
                data: {
                    telephone: this.data.phone,
                    countryCode: '86'
                },
                success: function (data) {
                    self.showErrormsg('验证码已发送')
                },
                fail: function (code, msg) {
                    self.showErrormsg(msg)
                    self.setData({
                        getCodeLock: false
                    })
                }
            })
    },

    errorMsgSuccess() {
        this.setData({
            errorMsgHidden: true
        });
    },

    //倒计时
    countdown() {
        let self = this
        let count = 60
        let phoneTimer = setInterval(function () {
            setInvalTime()
        }, 1000);

        function setInvalTime() {
            if (count == 0) {
                self.setData({
                    codeButtonText: '获取验证码',
                    getCodeLock: false
                });
                clearInterval(phoneTimer);
            } else {
                self.setData({
                    codeButtonText: count + '秒后重试'
                });
            }
            count--
        }

        setInvalTime()
    },

    //提交验证
    validate() {
        let self = this
        if (!this.data.phone) {
            this.showErrormsg('请输入您的手机号码');
            this.setData({
                loginLocked: false
            })
            return
        }
        if (!this.data.verifyCode) {
            this.showErrormsg('请输入您收到的验证码');
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
        userApi
            .bindtelephone({
                data: {
                    telephone: this.data.phone,
                    authCode: this.data.verifyCode,
                    type: 2
                },
                success: function (data) {
                    app.globalData.userInfo.phoneNum = data.phone
                    if (self.data.redirectUrl) {
                        wx.redirectTo({
                            url: self.data.redirectUrl
                        })
                        return;
                    }
                    wx.navigateBack()
                },
                fail: function (code, msg) {
                    self.showErrormsg(msg)
                    self.setData({
                        loginLocked: false
                    })
                }
            })
    }


})
