/**
 * @author walid
 * @date 2016/11/21
 * @description task API
 */

import utils from '../index.js'

let apiURL = {
    // 任务列表接口
    list: '/v1/task/list',
    // 任务详情接口
    get: '/v1/task/get',
    // 用户任务列表
    userList: '/v1/task/user/list',
    // 领取任务
    userreceivetask: '/v1/task/userreceivetask',
    // 提交任务
    post: '/v1/task/post'
}

module.exports = {
    list: function (reqObj = {}) {
        reqObj.url = apiURL.list
        utils.requestGet(reqObj)
    },

    get: function (reqObj = {}) {
        reqObj.url = apiURL.get
        utils.requestGet(reqObj)
    },

    /**
     "status": status,
     "start": start,
     "size": size
     * @param reqObj
     */
    userList: function (reqObj = {}) {
        reqObj.url = apiURL.userList
        utils.requestGet(reqObj)
    },

    userreceivetask: function (reqObj = {}) {
        reqObj.url = apiURL.userreceivetask
        utils.requestPost(reqObj)
    },
}
