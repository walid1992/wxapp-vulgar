/**
 * @author walid
 * @date 2016/11/19
 * @description 我的钱包
 */

let userApi = require('../../api/user/index.js')
import router from '../../router/config.js'
import utils from '../../utils/util'

let app = getApp()

Page({
    data: {
        // 显示加载更多 loading
        hothidden: true,
        list: [],
    },

    onLoad() {
        this.getUserSettlements()
    },

    // 下拉刷新
    onPullDownRefresh() {
        let self = this
        wx.showToast({
            title: '加载中...',
            icon: 'loading',
            duration: 10000
        })
        self.getUserSettlements()
    },

    getUserSettlements() {
        let self = this
        userApi.usersettlements({
            data: {
                start: self.data.list.length,
                size: 10
            },
            success: function (data) {
                wx.stopPullDownRefresh()
                wx.hideToast()
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
            fail: function (code, msg) {
                console.log('error' + msg)
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
            success: function(res) {
                if (res.confirm) {
                    self.withdrawtip()
                }
            }
        })
    },

    withdrawtip() {
        let self = this
        userApi.withdrawtip({
            data: { 
            },
            success: function (data) {
                wx.showModal({
                    title: '温馨提示',
                    content: data.tipString,
                    success: function(res) {
                        if (res.confirm) {
                            if(data.withdrawMark){
                                self.withdraw()
                            }else{

                            }
                        }
                    }
                })
                
            },
            fail: function (code, msg) {
                wx.showToast({
                    title: msg,
                    icon: 'success',
                    duration: 2000
                })
            }
        })
    },

    withdraw() {
        let self = this
        userApi.withdraw({
            data: { 
            },
            success: function (data) {
                wx.showModal({
                    title: '温馨提示',
                    content: data.tipString,
                    success: function(res) {
                        
                    }
                })
                
            },
            fail: function (code, msg) {
                console.log('error' + msg)
            }
        })
    }
})
