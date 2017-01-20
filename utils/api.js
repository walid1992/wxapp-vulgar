/**
 * @author walid
 * @date 2016/11/21
 * @description 网络请求工具类
 */

const apiURL = {
  baseUrl: 'https://www.hbbtj.com'
}

function request(reqObj = {}) {
  wx.request({
    url: apiURL.baseUrl + reqObj.url,
    method: reqObj.method,
    data: reqObj.data,
    header: reqObj.header,
    success (res) {
      // 成功数据回调
      if (res.data.code == 200) {
        if (reqObj.success) {
          reqObj.success(res.data.data)
        }
      } else {
        if (reqObj.fail) {
          reqObj.fail(res.data.code, res.data.message)
        }
      }
      console.log(res.data)
    },
    fail (res) {
      if (reqObj.fail) {
        reqObj.fail(res.data.code, res.data.message)
      }
    }
  })
}


/**
 * get 请求
 * @param reqObj
 * @returns {*}
 */
function requestGet(reqObj = {}) {
  let defaultObj = {
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': wx.getStorageSync('ticket')
    },
    method: 'GET'
  }
  // Object.assign(reqObj, defaultObj)
  reqObj.header = defaultObj.header
  reqObj.method = defaultObj.method
  return request(reqObj)
}

/**
 * post 请求
 * @param reqObj
 * @returns {*}
 */
function requestPost(reqObj = {}) {
  let defaultObj = {
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': wx.getStorageSync('ticket')
    },
    method: 'POST'
  }
  // Object.assign(reqObj, defaultObj)
  reqObj.header = defaultObj.header
  reqObj.method = defaultObj.method
  return request(reqObj)
}

export default {
  requestGet, requestPost
}
