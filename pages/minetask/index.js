/**
 * @author walid
 * @date 2016/11/19
 * @description 我的任务页
 */

Page({
    data: {
        winWidth: 0,
        winHeight: 0,
        // tab切换
        currentTab: 0,
        // 显示加载更多 loading
        hothidden: true,
    },

    /**
     * 页面初始化
     * options 为页面跳转所带来的参数
     */
    onLoad: function (options) {
        let that = this
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    winWidth: res.windowWidth,
                    winHeight: res.windowHeight
                });
            }
        })
        wx.showToast({
            title: '加载中...',
            icon: 'loading',
            duration: 10000
        })
    },

    onReady: function () {
        // 页面渲染完成
        let self = this
        // 数据加载完成后 延迟隐藏loading
        setTimeout(function () {
            wx.hideToast()
        }, 500)
    },

    /**
     * 下拉刷新
     */
    onPullDownRefresh() {
        setTimeout(function () {
            wx.hideToast()
        }, 200)
    },

    /**
     * 加载更多
     */
    onReachBottom: function () {
        let self = this
        if (!self.data.hothidden) {
            return
        }
        self.setData({
            hothidden: false,
        })
        self.getTaskList()
    },

    /**
     * 获取计划
     */
    getTaskList() {
        let self = this
        campaignApi.list(self.data.list.length, 10, function (res) {
            wx.stopPullDownRefresh()
            wx.hideToast()
            // 如果数据为空，则显示没有更多数据
            let hothidden = true
            if (res.data.length <= 0) {
                setTimeout(function () {
                    self.setData({
                        hothidden: false
                    })
                }, 200)
            }
            self.setData({
                hothidden: hothidden,
                list: self.data.list.concat(res.data),
            })
        })
    },

    /**
     * 滑动切换tab
     * @param e
     */
    bindChange: function (e) {
        let self = this
        self.setData({
            currentTab: e.detail.current
        })
    },
    /**
     * 点击tab切换
     * @param e
     * @returns {boolean}
     */
    swichNav: function (e) {
        let self = this
        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            self.setData({
                currentTab: e.target.dataset.current
            })
        }
    },
})
