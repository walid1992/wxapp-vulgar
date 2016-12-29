/**
 * @author walid
 * @date 2016/11/28
 * @description 商品推广页
 */

import campaignApi from '../../api/campaign/index.js'
import router from '../../router/index.js'

const app = getApp()

Page({
  data: {
    id: 0,
    campaignProductVo: {},
  },

  onLoad(options) {
    let self = this
    self.setData({
      id: options.id
    })
    app.showLoading()
    self.loadData()
  },

  toAction(e) {
    app.showToast('商品链接')
    window.location.href = self.data.campaignProductVo.productUrl
  },

  loadData() {
    let self = this
    campaignApi
      .productGet({
        data: {
          campaignProductId: self.data.id
        },
        success(data) {
          app.hideToast()
          self.setData({
            campaignProductVo: data,
          })
        }
      })
  }
})
