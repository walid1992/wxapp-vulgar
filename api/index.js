/**
 * Created by walid on 16/10/10.
 * api 封装
 */

var apiURL = {
    baseUrl: 'http://123.57.2.62:8089',
}

var callback = {
    success: function (data) { },
    fail: function (code, msg) { }
}

function request(url, method, body, call) {
    wx.request({
        url: apiURL.baseUrl + url,
        method: method,
        data: body,
        header: {
            source: "weapp"
        },
        success: function (res) {
            // 成功数据回调
            if (res.data.code == 200) {
                call.success(res.data.data)
            } else {
                call.fail(res.data.code, res.data.message)
            }
            console.log(res.data)
        },
        fail: function (res) {
            call.fail(res.data.code, res.data.message)
            console.log("请求失败~")
        }
    })
}

module.exports = {
    requestGet: function requestGet(url, body, call) {
        return request(url, "GET", body, call)
    },

    requestPost: function requestPost(url, body, call) {
        return request(url, "POST", body, call)
    }
}
