/**
 * Created by walid on 16/10/10.
 * api 封装
 */

var apiURL = {
    // baseUrl: 'https://www.shuidihuzhu.com:8830',
    baseUrl: 'http://103.37.145.195:8830',
    // baseUrl: 'http://192.168.1.228/',
}

function request( url, method, body, callback ) {
    wx.request( {
        url: apiURL.baseUrl + url,
        method: method,
        data: body,
        header: {
           source:"weapp"
        },
        success: function( res ) {
            // 成功数据回调
            if( res.data.code == 0 ) {
                callback( res.data )
            } else {
            }
            console.log( res.data )
        },
        fail: function( res ) {
            console.log( "请求失败~" )
        }
    })
}

module.exports = {
    requestGet: function requestGet( url, callback ) {
        request( url, "GET", {}, callback )
    },

    requestGetWithBody: function requestGetWithBody( url, body, callback ) {
        request( url, "GET", body, callback )
    },

    requestPost: function requestPost( url, callback ) {
        request( url, "POST", {}, callback )
    },

    requestPostWithBody: function requestPostWithBody( url, body, callback ) {
        request( url, "POST", body, callback )
    },
}
