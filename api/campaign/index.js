/**
 * Created by walid on 16/10/10.
 * ins campaign utils
 */

var api = require('../index.js')

var apiURL = {
    // 宝贝列表接口
    list: '/v1/campaign/list',
    // 宝贝产品列表接口
    productList: '/v1/campaign/product/list'
}

module.exports = {
    list: function (start, size, call) {
        api.requestGet(apiURL.list, {
            "start": start,
            "size": size
        }, call)
    },
    productList: function (campaignId, start, size, call) {
        api.requestGet(apiURL.productList, {
            "campaignId":campaignId,
            "start": start,
            "size": size
        }, call)
    }
}
