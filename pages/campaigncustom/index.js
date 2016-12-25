/**
 * @author walid
 * @date 2016/11/28
 * @description 商品推广页
 */

import campaignApi from '../../api/campaign/index.js'

const app = getApp()

Page({
  data: {
    id: 0,
    campaignInfoVo: {},
    qrCodeUrl: '',
    inputLink: ''
  },

  onLoad(options) {
    let self = this
    self.setData({
      id: options.id
    })
    app.showLoading()
    self.loadData()
  },

  bindLinkInput(e) {
    this.setData({
      inputLink: e.detail.value
    })
  },

  toGenerate(e) {
    let self = this
    if (!self.data.inputLink) {
      app.showToast('链接地址不能为空~')
      return
    }
    app.showToast('生成URL~')
    self.setData({
      qrCodeUrl: self.data.inputLink,
    })
  },

  loadData() {
    let self = this
    campaignApi
      .get({
        data: {
          campaignId: self.data.id
        },
        success (data) {
          app.hideToast()
          self.setData({
            campaignInfoVo: data,
          })
        }
      })
  }
})
