/**
 * @author walid
 * @date 2016/11/19
 * @description 个人资料页
 */

import router from '../../router/index.js'

const app = getApp()

Page({
  data: {
    userInfo: {},
    modalHidden: true,
    userListInfo: []
  },

  onLoad: function () {

    let alipay = "绑定支付宝账号"
    let iphone = "暂未绑定号码"
    if (app.globalData.userInfo.alipay != null) {
      alipay = app.globalData.userInfo.alipay
    }
    if (app.globalData.userInfo.phoneNum != null) {
      iphone = app.globalData.userInfo.phoneNum
    }

    this.setData({
      userInfo: app.globalData.userInfo,
      userListInfo: [{
        icon: '../../images/iconfont-dingdan.png',
        leftItem: '姓名',
        rightItem: app.globalData.userInfo.name,
        margin: '20rpx',
      }, {
        icon: '../../images/iconfont-card.png',
        leftItem: '手机号',
        rightItem: iphone,
      }, {
        icon: '../../images/iconfont-card.png',
        leftItem: '支付宝账号',
        rightItem: alipay,
      }, {
        icon: '../../images/iconfont-icontuan.png',
        leftItem: '绑定微信',
        rightItem: '已绑定',
      }]
    })
  },

  cellItemClick(e) {
    var index = e.currentTarget.dataset.index
    console.log("index = " + index)
    if (index == 1) {
      let url = app.router.config.login.url
      router.navigateTo(url)
    }
    if (index == 2) {
      let url = app.router.config.modifyAlipay.url
      router.navigateTo(url)
    }
  },

  logoutTap: function (e) {
    this.setData({
      modalHidden: false
    })
  },

  modalChange: function (e) {
    this.setData({
      modalHidden: true
    })
  },

})
