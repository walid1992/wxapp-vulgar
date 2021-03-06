/**
 * @author walid
 * @date 2016/11/19
 * @description 个人资料页
 */

const app = getApp()

Page({
  data: {
    userInfo: {},
    modalHidden: true,
    userListInfo: []
  },

  onLoad() {
    let alipay = '绑定支付宝账号'
    let iphone = '暂未绑定号码'
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
        margin: '20rpx'
      }, {
        icon: '../../images/iconfont-card.png',
        leftItem: '手机号',
        rightItem: iphone
      }, {
        icon: '../../images/iconfont-card.png',
        leftItem: '支付宝账号',
        rightItem: alipay
      }, {
        icon: '../../images/iconfont-icontuan.png',
        leftItem: '绑定微信',
        rightItem: '已绑定'
      }]
    })
  },

  cellItemClick(e) {
    let index = e.currentTarget.dataset.index
    if (index == 1) {
      app.$router.navigateTo(app.$routerName.login.url)
    }
    if (index == 2) {
      app.$router.navigateTo(app.$routerName.modifyAlipay.url)
    }
  },

  logoutTap(e) {
    this.setData({
      modalHidden: false
    })
  },

  modalChange(e) {
    this.setData({
      modalHidden: true
    })
  }

})
