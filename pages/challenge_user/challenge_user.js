getApp();

Page({
    data: {},
    onLoad: function(a) {
        console.log(a), wx.showNavigationBarLoading();
        var t = wx.getStorageSync("project_id"), e = this;
        wx.request({
            url: "https://daka.55rd.com/index.php/api/index/joined_user_list",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: {
                project_id: t,
                date: a.date
            },
            method: "post",
            success: function(a) {
                console.log(a), e.setData({
                    head_arr: a.data.data
                }), wx.hideNavigationBarLoading();
            }
        });
    }
});