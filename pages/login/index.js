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
        });
    },

    //获取验证码
    getCodeTap(e) {
        var that = this;

        if (!this.data.phone) {
            this.showErrormsg('请填写手机号');
            return;
        }

        if (!/^1\d{10}$/.test(this.data.phone)) {
            this.showErrormsg('请输入正确的手机号码');
            return;
        }

        if (this.data.getCodeLock) {
            return;
        }

        this.setData({
            getCodeLock: true
        });

        var requestData = {
            mobile: this.data.phone
        };

        wx.request({
            url: api.sendVerifyCode.url,
            data: {
                mobile: this.data.phone
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            success: function(res) {
                if (res.data.code == 0) {
                    that.showErrormsg('验证码已发送');

                    that.timer();
                } else {
                    that.showErrormsg(res.data.msg);

                    that.setData({
                        getCodeLock: false
                    });
                }
            }
        });
    },

    errorMsgSuccess() {
        this.setData({
            errorMsgHidden: true
        });
    },

    //倒计时
    timer() {
        var that = this;
        var count = 60;

        function setInvalTime() {
            if (count == 0) {
                that.setData({
                    codeButtonText: '获取验证码',
                    getCodeLock: false
                });

                clearInterval(phoneTimer);
            } else {
                that.setData({
                    codeButtonText: count + '秒后重试'
                });
            }

            count--;
        }

        setInvalTime();

        var phoneTimer = setInterval(function() {
            setInvalTime();
        }, 1000);
    },

    //提交验证
    validate() {
        var that = this;

        if (!this.data.phone) {
            this.showErrormsg('请输入您的手机号码');
            this.setData({
                loginLocked: false
            });
            return;
        }

        if (!this.data.verifyCode) {
            this.showErrormsg('请输入您收到的验证码');
            this.setData({
                loginLocked: false
            });
            return;
        }

        if (this.data.loginLocked) {
            return;
        }

        this.setData({
            loginLocked: true
        });

        this.signIn(function(data) {
            wx.setStorageSync('userId', data.userId);
            wx.setStorageSync('mobile', data.userAccount.mobile);
            wx.setStorageSync('token', data.token);

            if (that.data.redirectUrl) {
                wx.redirectTo({
                    url: that.data.redirectUrl
                });
                return;
            }

            wx.navigateBack();
        });
    },

    //登录请求
    signIn(callback) {
        var that = this;

        wx.request({
            url: api.signIn.url,
            data: {
                thirdType: 1,
                openId: wx.getStorageSync('openId'),
                mobile: this.data.phone,
                mobileCode: this.data.verifyCode,
                scope: 'base',
                thirdToken: wx.getStorageSync('thirdToken')
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            success: function(res) {
                if (res.data.code == 0) {
                    callback && callback(res.data.data);
                } else {
                    that.showErrormsg(res.data.msg);

                    that.setData({
                        loginLocked: false
                    });
                }
            }
        });
    }
});
