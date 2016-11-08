/**
 * Created by walid on 16/10/10.
 * ins campaign utils
 */

var api = require('../api.js')

var apiURL = {
    // 宝贝列表接口
    list: '/v1/campaign/list'
}

module.exports = {
    list: function(start, size, callback) {
        api.requestGetWithBody(apiURL.list, {
            "start": start,
            "size": size
        }, callback)
    }
}
