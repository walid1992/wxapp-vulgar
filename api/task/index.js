/**
 * Created by walid on 16/10/10.
 * task api utils
 */

import api from '../index.js'

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
    list: function (start, size, call) {
        api.requestGet(apiURL.list, {
            "start": start,
            "size": size
        }, call)
    },
    get: function (taskId, call) {
        api.requestGet(apiURL.get, {
            "taskId": taskId
        }, call)
    },
    userList: function (status, start, size, call) {
        api.requestGet(apiURL.userList, {
            "status": status,
            "start": start,
            "size": size
        }, call)
    },
    userreceivetask: function (taskId, call) {
        api.requestPost(apiURL.userreceivetask, {
            "taskId": taskId
        }, call)
    }
}
