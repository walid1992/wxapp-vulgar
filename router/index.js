/**
 * @author walid
 * @date 2016/11/20
 * @description router 工具类
 */

import config from './config.js'

function _params(obj = {}) {
    let _ = encodeURIComponent
    return Object.keys(obj).map(k => `${_(k)}=${_(obj[k])}`).join('&')
}

module.exports = {
    config: config,
    push: function (url, obj = {}) {
        wx.navigateTo({
            url: url + '?' + _params(obj)
        })
    },
    pop: function (taskId, call) {
        api.requestGet(apiURL.get, {
            "taskId": taskId
        }, call)
    }
}