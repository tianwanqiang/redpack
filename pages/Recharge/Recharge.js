var a, e = "";

Page({
    data: {
        addclass: "",
        recharge_money: [ {
            money: 10,
            give: 0
        }, {
            money: 20,
            give: 0
        }, {
            money: 50,
            give: 0
        }, {
            money: 100,
            give: 0
        }, {
            money: 150,
            give: 0
        }, {
            money: 200,
            give: 0
        } ]
    },
    onLoad: function(e) {
        wx.showNavigationBarLoading(), a = wx.getStorageSync("information"), console.log(a);
        var t = this;
        wx.request({
            url: "https://daka.55rd.com/index.php/api/user/get_balance",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: {
                user_id: a.id,
                token: a.token
            },
            method: "post",
            success: function(a) {
                t.setData({
                    balance: parseFloat(.01 * a.data.data.balance).toFixed(2)
                }), wx.hideNavigationBarLoading();
            }
        });
    },
    choose: function(a) {
        var t = this;
        t.setData({
            addclass: "addbg",
            n: a.currentTarget.dataset.index,
            qian: t.data.recharge_money[a.currentTarget.dataset.index].money
        }), e = t.data.recharge_money[a.currentTarget.dataset.index].money;
    },
    btn: function(a) {
        e = a.detail.value;
    },
    recharge: function() {
        console.log(e), "" == e ? wx.showModal({
            title: "请选择或输入充值金额",
            showCancel: !1
        }) : wx.request({
            url: "https://daka.55rd.com/index.php/api/wx/signature",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: {
                user_id: a.id,
                token: a.token,
                project_id: 1,
                type: 2,
                amount: 100 * e,
                openid: a.openid,
                miniapp: 1
            },
            method: "post",
            success: function(a) {
                console.log(a.data.data), wx.requestPayment({
                    timeStamp: a.data.data.timeStamp,
                    nonceStr: a.data.data.nonceStr,
                    package: a.data.data.package,
                    signType: "MD5",
                    paySign: a.data.data.paySign,
                    success: function(a) {
                        console.log(a);
                    },
                    fail: function(a) {}
                });
            }
        });
    }
});