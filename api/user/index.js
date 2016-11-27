/**
 * @author taoming
 * @date 2016/11/26
 * @description user API
 */

import utils from '../index.js'

const apiURL = {
    // 三方登录接口
    loginbyopenid: '/v1/account/loginByOpenId',
    bindtelephone: '/v1/account/bindtelephone',
    profileupdate: '/v1/account/userProfile/update',
    usersettlements:'/v1/account/user/settlements',
    withdrawtip:'/v1/account/withdrawtip',
    withdraw:'/v1/account/withdraw',
    withdrawlist:'/v1/account/withdraw/list'
}

export default {
    
    loginbyopenid: function (reqObj = {}) {
        reqObj.url = apiURL.loginbyopenid
        utils.requestPost(reqObj)
    },

    bindtelephone: function (reqObj = {}) {
        reqObj.url = apiURL.bindtelephone
        utils.requestPost(reqObj)
    },

    profileupdate: function (reqObj = {}) {
        reqObj.url = apiURL.profileupdate
        utils.requestPost(reqObj)
    },

    usersettlements: function (reqObj = {}) {
        reqObj.url = apiURL.usersettlements
        utils.requestGet(reqObj)
    },

    withdrawtip: function (reqObj = {}) {
        reqObj.url = apiURL.withdrawtip
        utils.requestGet(reqObj)
    },

    withdraw: function (reqObj = {}) {
        reqObj.url = apiURL.withdraw
        utils.requestGet(reqObj)
    },

     withdrawlist: function (reqObj = {}) {
        reqObj.url = apiURL.withdrawlist
        utils.requestGet(reqObj)
    },
}
