/**
 * @author walid
 * @date 2016/11/21
 * @description common API
 */

import utils from  '../../utils/api.js'

const apiURL = {
  // 获取验证码
  getauthcode: '/v1/common/getauthcode'
}

export default {
  /**
   'telephone': telephone,
   'countryCode': '86'
   * @param reqObj
   */
  getauthcode (reqObj = {}) {
    reqObj.url = apiURL.getauthcode
    utils.requestGet(reqObj)
  }
}
