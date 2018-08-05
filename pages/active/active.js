var a = [];

Page({
    data: {},
    onLoad: function(t) {
        var e = this;
        wx.showNavigationBarLoading();
        var o = wx.getStorageSync("bgImg");
        " " == o ? (console.log("缓存为空"), a = [], wx.request({
            url: "https://daka.55rd.com/index.php/api/project/project_list",
            data: {},
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(t) {
                console.log(t.data.data.list), wx.setStorageSync("bgImg", t.data.data.list);
                for (var o = 0; o < t.data.data.list.length; o++) a.push(t.data.data.list[o].id);
                console.log(a), 200 == t.statusCode && (e.setData({
                    active: t.data.data.list
                }), wx.hideNavigationBarLoading());
            }
        })) : (wx.hideNavigationBarLoading(), console.log("缓存不为空" + o), e.setData({
            active: o
        }));
    },
    project_id: function(t) {
        var e = t.currentTarget.dataset.index, o = a[e];
        wx.reLaunch({
            url: "../../pages/home/home?project_id=" + o
        });
    },
    serch_id: function(a) {
        console.log(a.detail.value);
    }
});