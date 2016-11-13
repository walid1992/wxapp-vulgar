/**
 * Created by walid on 16/10/10.
 * ins api utils
 * （每一个api目录都对应一个人，别人要拿他这个api下的数据，只需从他这里拿就可以了，
 *   n个界面调用这个接口，也只需通过它来调用，以后修改也方便，也不用传递过多参数，
 *   而且这个api也仅仅负责业务的周转，具体的网络请求发起由apiapi.js来调用，
 *   1、职责分工明确（单一职责原则）
 *   2、对扩展开放，对修改关闭（开放封闭原则））
 */

var api = require('../index.js')

var apiURL = {
    // 互助列表接口
    list: '/v1/task/list'
}

module.exports = {
    list: function(start, size, call) {
        api.requestGet(apiURL.list, {
            "start": start,
            "size": size
        }, call)
    }
}
