Page({
    data: {
        can: "true",
        balance: "0.00",
        yesterday: "0.00",
        contract: "0.00",
        harvest: "0.00",
        join_count: 0
    },
    onLoad: function(a) {
        wx.showNavigationBarLoading();
        var t = wx.getStorageSync("information"), e = this;
        console.log(t), wx.request({
            // url: "https://daka.55rd.com/index.php/api/user/money_log",
          url: "http://localhost:8080/user/moneyLog",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: {
                user_id: t.id,
                token: t.token
            },
            method: "post",
            success: function(a) {
              
                for (var t = 0; t < a.data.data.list.length; t++) a.data.data.list[t].day = a.data.data.list[t].created_at.substring(0, 9), 
                a.data.data.list[t].time = a.data.data.list[t].created_at.substring(9, 14);
                e.setData({
                    contract: parseFloat(.01 * a.data.data.contract).toFixed(2),
                    harvest: parseFloat(.01 * a.data.data.harvest).toFixed(2),
                    yesterday: parseFloat(.01 * a.data.data.yesterday).toFixed(2),
                    join_count: a.data.data.join_count,
                    list: a.data.data.list
                }), wx.hideNavigationBarLoading();
            }
        });
    },
    tixian_rule: function() {
        wx.navigateTo({
            url: "../../pages/tixian_rule/tixian_rule"
        });
    },
    in_money: function(a) {
        var t = this, e = a.detail.value;
        e = parseFloat(e).toFixed(3), console.log(e), e <= this.data.balance ? (console.log("ok"), 
        t.setData({
            can: "true"
        })) : t.setData({
            can: "false"
        });
    },
    getcash_all: function() {
        this.setData({
            money: this.data.balance
        });
    },
    takeCash: function() {
        wx.showModal({
            title: "目前小程序不支持提现，请您下载APP进行提现",
            content: "是否去下载APP",
            confirmText: "确认下载",
            success: function(a) {
                a.confirm ? wx.navigateTo({
                    url: "../../pages/DownloadApp/DownloadApp"
                }) : console.log("用户取消");
            }
        });
    }
});