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

export default {
    config: config,
    navigateTo: function (url, obj = {}) {
        wx.navigateTo({
            url: url + '?' + _params(obj)
        })
    },
    redirectTo: function (url, obj = {}) {
        wx.redirectTo({
            url: url + '?' + _params(obj)
        })
    },
    navigateBack: function (delta = 1) {
        wx.navigateBack(delta)
    }
}