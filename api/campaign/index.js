/**
 * @author walid
 * @date 2016/11/21
 * @description campaign API
 */

import utils from  '../index.js'

const apiURL = {
    // 宝贝列表接口
    list: '/v1/campaign/list',
    // 宝贝列表接口
    get: '/v1/campaign/get',
    // 宝贝产品列表接口
    productList: '/v1/campaign/product/list',
    // 商品详情接口
    productGet: '/v1/campaign/product/get'
}

export default {

    list: function (reqObj = {}) {
        reqObj.url = apiURL.list
        utils.requestGet(reqObj)
    },

    /**
     "campaignId":campaignId,
     "start": start,
     "size": size
     * @param reqObj
     */
    productList: function (reqObj = {}) {
        reqObj.url = apiURL.productList
        utils.requestGet(reqObj)
    },

    /**
     * @param reqObj
     * campaignProductId":campaignProductId
     */
    productGet: function (reqObj = {}) {
        reqObj.url = apiURL.productGet
        utils.requestGet(reqObj)
    },

    /**
     * @param reqObj
     * campaignId:campaignId
     */
    get: function (reqObj = {}) {
        reqObj.url = apiURL.get
        utils.requestGet(reqObj)
    },

}
