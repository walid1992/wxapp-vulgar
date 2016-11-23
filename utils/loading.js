/**
 * @author walid
 * @date 2016/11/23
 * @description Loading 加载工具
 */

module.exports = {
    show: function (duration = 10000) {
        wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: duration
        })
    },

    dismiss: function () {
        wx.hideToast()
    }
}