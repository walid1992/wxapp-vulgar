/**
 * @author taoming
 * @date 2016/11/26
 * @description 修改支付宝信息页面
 */

import userApi from '../../api/user/index.js'

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
        });
    },

    //显示错误信息
    showErrormsg(msg) {
        this.setData({
            errorMsg: msg,
            errorMsgHidden: false
        })
    },


    postAlipay(e) {
        var that = this;
        if (!this.data.alipay) {
            this.showErrormsg('请填写支付宝信息')
            return
        }
        
        var requestData = {
            alipay: this.data.alipay
        }

        userApi
            .profileupdate({
                data: {
                     alipay: this.data.alipay
                },
                success: function (data) {
                    app.globalData.userInfo.alipay = data.alipay
                    if (that.data.redirectUrl) {
                        wx.redirectTo({
                            url: that.data.redirectUrl
                        })
                        return;
                    }
                    wx.navigateBack()
                },
                fail: function (code, msg) {
                    that.showErrormsg(msg)
                }
            })
    },

    errorMsgSuccess() {
        this.setData({
            errorMsgHidden: true
        });
    }
})
