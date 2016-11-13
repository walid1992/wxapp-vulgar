/**
 * Created by walid on 16/10/13.
 * common api utils
 */

var api = require('../index.js')

var apiURL = {
    // 获取验证码
    getauthcode: '/v1/common/getauthcode'
}

module.exports = {
    getauthcode: function (telephone, call) {
        api.requestGet(apiURL.getauthcode, {
            'telephone': telephone,
            'countryCode': '86'
        }, call)
    }
}
